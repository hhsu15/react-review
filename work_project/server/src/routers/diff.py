"""Endpoints for diffing functionalities."""
import logging
from io import BytesIO, StringIO

from ..utils import load_wb

import openpyxl
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import StreamingResponse
import csv

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/diff", tags=["diff"])


@router.post("/get-diff-file")
async def diff_files(
    baseFile: UploadFile = File(...), compareFile: UploadFile = File(...)
):

    logger.info(
        f"Receieving input files.\n  Base File:{baseFile.filename}\n  Compare to file: {compareFile.filename}"
    )

    # csv handler here
    if baseFile.filename.endswith(".csv") and compareFile.filename.endswith(".csv"):
        print("Use CSV handler...")
        # read the file using csv
        base_content = await baseFile.read()
        compare_content = await compareFile.read()
        base_buffer = StringIO(base_content.decode("utf-8"))
        # need to skip rows
        for i in range(3):
            next(base_buffer)

        compare_buffer = StringIO(compare_content.decode("utf-8"))

        csvReader = csv.DictReader(base_buffer)
        for row in csvReader:
            print(row)

        return
    # convert files to Excel object
    else:
        base_wb, compare_wb = [await convert_to_xl(f) for f in [baseFile, compareFile]]
        diff_result = diff(base_wb, compare_wb)

    return diff_result


async def convert_to_xl(file: UploadFile):
    """Convert file stream to openpyxl obj."""
    content = await file.read()
    wb = load_wb(filename=BytesIO(content))
    logger.info(wb.sheetnames)
    return wb


def diff(base_wb, comp_wb):
    """Perfom diffing logics here."""
    # some code here to comare two files
    # ...

    # provide output
    logger.info("Get streaming...")
    stream_res = _make_fake_wb()

    return stream_res


def _make_fake_wb():
    wb = openpyxl.Workbook()
    st = wb.active
    st.title = "Summary"
    st["A1"].value = "Additons"
    st["A2"].value = "Deletions"

    virtual_workbook = BytesIO()
    wb.save(virtual_workbook)
    virtual_workbook.seek(0)
    filename = "my_excel.xlsx"
    headers = {"Content-Disposition": f"attachment; filename={filename}"}

    return StreamingResponse(virtual_workbook, headers=headers)


@router.get("/get-file")
async def get_excel():
    """Just POC code."""

    return _make_fake_wb()
