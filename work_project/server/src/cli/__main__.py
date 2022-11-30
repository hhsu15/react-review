from pathlib import Path
from typing import Optional
import typer
import rich
from ..utils import load_wb


app = typer.Typer()


@app.command()
def main(
    base_filepath: str,
    compare_filepath: str,
    out_filename: str = typer.Option(..., "--out", "-o"),
):
    bf = Path(base_filepath)
    cf = Path(compare_filepath)
    wb_base = load_wb(base_filepath)
    wb_compare = load_wb(compare_filepath)

    # work on the magic here
    # ...
    rich.print(wb_base.sheetnames, wb_compare.sheetnames)
    rich.print(f"{out_filename} has been generated.")


if __name__ == "__main__":
    app()
