from __future__ import annotations
import csv
import json
from collections import OrderedDict
from typing import Any, Callable


class Table:
    def __init__(self, path: str, columns: set[str]) -> None:
        self.rows = []
        with open(path, "r") as f:
            reader = csv.reader(f, delimiter="\t")
            headers = next(reader)
            column_count = len(headers)
            column_to_indices = {column: headers.index(column) for column in columns}
            for row in reader:
                row += [None] * (column_count + len(row))
                self.rows.append(TableRow({
                    column: row[index]
                    for column, index in column_to_indices.items()
                }))

    def filter(self, func: Callable[[TableRow], bool]) -> None:
        self.rows = list(filter(func, self.rows))

    def get_by_name(self, name: str) -> Any:
        return list(filter(lambda row: row.first_last == name, self.rows))

class TableRow:
    def __init__(self, properties: dict[str, Any]) -> None:
        self._properties = {key.replace("-", "_"): value for key, value in properties.items()}

    def __repr__(self) -> str:
        return f"<TableRow: {self._properties}>"

    def __getattr__(self, _name: str) -> Any:
        return self._properties[_name]


class Athlete:
    def __init__(self, first: str, nickname: str, last: str, grade: int) -> None:
        self.first = first
        self.nickname = nickname
        self.last = last
        self.grade = grade

    def __str__(self) -> str:
        return (
            "<"
            f"Athlete name:\"{self.nickname if self.nickname else self.first} {self.last}\""
            f"attendance:({self.practice_count}, {self.practice_percentage}%)"
            ">"
        )

    @property
    def name(self) -> str:
        return f"{self.first} {self.last}"

    @property
    def display_name(self) -> str:
        return f"{self.nickname if self.nickname else self.first} {self.last}"

    @property
    def file_name(self) -> str:
        return self.name.lower().replace(" ", "-").replace("'", "") + ".json"

    @property
    def is_senior(self) -> bool:
        return self.grade == 12

    @property
    def json(self) -> str:
        slides = []

        slides.append(OrderedDict([
            ("name", "welcome"),
            ("replacements", OrderedDict([
                ("name", self.display_name),
            ])),
        ]))

        if self.diver:
            slides.append(OrderedDict([
                ("name", "practice-summary-diver"),
                ("replacements", OrderedDict([
                    ("practice-count", self.practice_count),
                    ("practice-percentage", self.practice_percentage),
                ])),
            ]))
        else:
            slides.append(OrderedDict([
                ("name", "practice-summary"),
                ("replacements", OrderedDict([
                    ("practice-count", self.practice_count),
                    ("total-yardage", self.total_yardage),
                    ("practice-percentage", self.practice_percentage),
                ])),
            ]))

        if self.diver:
            self.dives.sort(key=lambda dive: dive.score, reverse=True)
            recorded_numbers = set()
            top_per_number = []
            for dive in self.dives:
                if dive.number not in recorded_numbers:
                    top_per_number.append(dive)
                    recorded_numbers.add(dive.number)
            replacements = OrderedDict()
            for i, dive in enumerate(top_per_number[:5]):
                replacements[f"dive-number-{i+1}"] = dive.number
                replacements[f"dive-score-{i+1}"] = f"{dive.score:.2f}"
            slides.append(OrderedDict([
                ("name", "top-dives"),
                ("replacements", replacements),
            ]))

        if self.is_senior:
            slides.append(OrderedDict([
                ("name", "goodbye-senior"),
            ]))
        else:
            slides.append(OrderedDict([
                ("name", "goodbye"),
            ]))

        return json.dumps(OrderedDict([("slides", slides)]), indent=2)

    def set_attendance(self, attendance_table) -> None:
        attendance_row = attendance_table.get_by_name(self.name)[0]
        self.diver = attendance_row.diver == "TRUE"
        self.practice_count = int(attendance_row.practice_count)
        self.practice_percentage = attendance_row.practice_percentage
        if not self.diver:
            self.total_yardage = attendance_row.total_yardage

    def set_individual_dive_results(self, individual_dive_results_table) -> None:
        if not self.diver:
            return
        self.dives = list(map(IndividualDiveResult, individual_dive_results_table.get_by_name(self.name)))


class IndividualDiveResult:
    def __init__(self, row: TableRow) -> None:
        self.number = row.dive_number
        self.dod = float(row.degree_of_difficulty)
        self.score = float(row.total_score)

    def __repr__(self) -> str:
        return f"<IndividualDiveResult number:{self.number} dod:{self.dod} score:{self.score}>"


def main() -> None:
    roster_table = Table("data/roster.tsv", {"first", "nickname", "last", "grade"})
    attendance_table = Table("data/attendance.tsv", {"diver", "first-last", "practice-count", "practice-percentage", "total-yardage"})
    swim_results_table = Table("data/swim-results.tsv", {"first-last", "event", "time", "formatted-time", "place", "points", "date", "meet", "sectionals-qualifier", "states-qualifier"})
    individual_dive_results_table = Table("data/individual-dive-results.tsv", {"first-last", "dive-order", "dive-number", "degree-of-difficulty", "ns", "total-score", "qualified", "date", "meet"})
    overall_dive_results_table = Table("data/overall-dive-results.tsv", {"first-last", "dive-format", "score", "place", "date", "meet", "sectionals-qualifier", "states-qualifier"})

    individual_dive_results_table.filter(lambda row: row.ns == "FALSE")

    athletes = [Athlete(row.first, row.nickname, row.last, int(row.grade)) for row in roster_table.rows]
    athletes.sort(key=lambda athlete: athlete.last + athlete.first)

    for athlete in athletes:
        athlete.set_attendance(attendance_table)
        athlete.set_individual_dive_results(individual_dive_results_table)
        with open("athletes/" + athlete.file_name, "w") as f:
            f.write(athlete.json)


if __name__ == "__main__":
    main()
