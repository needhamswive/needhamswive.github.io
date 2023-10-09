import csv
import json
from collections import OrderedDict
from typing import Any

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

    def get(self, first_last: str) -> Any:
        return next(filter(lambda row: row.first_last == first_last, self.rows))

class TableRow:
    def __init__(self, properties: dict[str, Any]) -> None:
        self._properties = {key.replace("-", "_"): value for key, value in properties.items()}

    def __repr__(self) -> str:
        return f"<TableRow: {self._properties}>"

    def __getattr__(self, _name: str) -> Any:
        return self._properties[_name]

roster_table = Table("data/roster.tsv", {"first", "nickname", "last", "grade"})
attendance_table = Table("data/attendance.tsv", {"diver", "first-last", "practice-count", "practice-percentage", "total-yardage"})
swim_results_table = Table("data/swim-results.tsv", {"first-last", "event", "time", "formatted-time", "place", "points", "date", "meet", "sectionals-qualifier", "states-qualifier"})
individual_dive_results_table = Table("data/individual-dive-results.tsv", {"first-last", "dive-order", "dive", "degree-of-difficulty", "total-score", "qualified", "date", "meet"})
overall_dive_results_table = Table("data/overall-dive-results.tsv", {"first-last", "dive-format", "score", "place", "date", "meet", "sectionals-qualifier", "states-qualifier"})

class Athlete:
    def __init__(self, first: str, nickname: str, last: str) -> None:
        self.first = first
        self.nickname = nickname
        self.last = last

    def __str__(self) -> str:
        return (
            "<"
            f"Athlete name:\"{self.nickname if self.nickname else self.first} {self.last}\" "
            f"attendance:({self.practice_count}, {self.practice_percentage}%)"
            ">"
        )

    @property
    def first_last(self) -> str:
        return f"{self.first} {self.last}"

    @property
    def display_name(self) -> str:
        return f"{self.nickname if self.nickname else self.first} {self.last}"

    @property
    def file_name(self) -> str:
        return self.display_name.lower().replace(" ", "-").replace("'", "") + ".json"

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

        return json.dumps(OrderedDict([("slides", slides)]), indent=2)

    def set_attendance(self, attendance_table):
        attendance_row = attendance_table.get(self.first_last)
        self.diver = attendance_row.diver == "TRUE"
        self.practice_count = int(attendance_row.practice_count)
        self.practice_percentage = attendance_row.practice_percentage
        if not self.diver:
            self.total_yardage = attendance_row.total_yardage

athletes = [Athlete(row.first, row.nickname, row.last) for row in roster_table.rows]
athletes.sort(key=lambda athlete: athlete.last + athlete.first)

for athlete in athletes:
    athlete.set_attendance(attendance_table)
    with open("athletes/" + athlete.file_name, "w") as f:
        f.write(athlete.json)
