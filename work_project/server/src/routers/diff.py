"""Endpoints for diffing two files."""
import logging
from io import BytesIO

import openpyxl
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse


logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/diff", tags=["diff"])


@router.post("/get-diff-file")
async def diff_files(
    baseFile: UploadFile = File(...), compareFile: UploadFile = File(...)
) -> dict:

    logger.info(
        f"Receieving input files.\n  Base File:{baseFile.filename}\n  Compare to file: {compareFile.filename}"
    )

    # convert files to Excel object
    base_wb, compare_wb = [await convert_to_xl(f) for f in [baseFile, compareFile]]
    diff_result = diff(base_wb, compare_wb)

    return diff_result


async def convert_to_xl(file: UploadFile):
    """Convert file stream to openpyxl obj."""
    content = await file.read()
    wb = openpyxl.load_workbook(filename=BytesIO(content))
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
