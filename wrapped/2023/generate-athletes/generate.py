import csv
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
                assert len(row) == column_count
                self.rows.append(TableRow({
                    column: row[index]
                    for column, index in column_to_indices.items()
                }))

class TableRow:
    def __init__(self, properties: dict[str, Any]) -> None:
        self._properties = {key.replace("-", "_"): value for key, value in properties.items()}

    def __repr__(self) -> str:
        return f"<TableRow: {self._properties}>"

    def __getattr__(self, _name: str) -> Any:
        return self._properties[_name]

roster = Table("data/roster.tsv", {"first", "nickname", "last", "grade"})
attendance = Table("data/attendance.tsv", {"first-last", "practice-count", "practice-percentage"})
swim_results = Table("data/swim-results.tsv", {"first-last", "event", "time", "formatted-time", "place", "points", "date", "meet", "sectionals-qualifier", "states-qualifier"})
individual_dive_results = Table("data/individual-dive-results.tsv", {"first-last", "dive-order", "dive", "degree-of-difficulty", "total-score", "qualified", "date", "meet"})
overall_dive_results = Table("data/overall-dive-results.tsv", {"first-last", "dive-format", "score", "place", "date", "meet", "sectionals-qualifier", "states-qualifier"})

class Athlete:
    def __init__(self, first: str, nickname: str, last: str) -> None:
        self.first = first
        self.nickname = nickname
        self.last = last

    def __str__(self) -> str:
        return f"<Athlete name:\"{self.nickname if self.nickname else self.first} {self.last}\">"

athletes = [Athlete(row.first, row.nickname, row.last) for row in roster.rows]
athletes.sort(key=lambda athlete: athlete.last + athlete.first)
