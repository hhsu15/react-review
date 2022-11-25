"""Endpoints for diffing two files."""


import logging
from io import BytesIO

import openpyxl
from fastapi import APIRouter, UploadFile

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/diff", tags=["diffs"])


@router.post("/")
async def diff_files(baseFile: UploadFile, compareToFile: UploadFile) -> dict:

    result = {"message": None}

    logger.info(
        f"Receieving input files.\n  Base File:{baseFile.filename}\n  Compare to file: {compareToFile.filename}"
    )

    if not (baseFile and compareToFile):
        result["message"] = "Need two files to perform comparison"
        return result

    # convert files to Excel object
    base_wb, compare_to_wb = [await convert_to_xl(f) for f in [baseFile, compareToFile]]
    diff_result = diff(base_wb, compare_to_wb)
    result["message"] = diff_result

    return result


async def convert_to_xl(file: UploadFile):
    """Convert file stream to openpyxl obj."""
    content = await file.read()
    wb = openpyxl.load_workbook(filename=BytesIO(content))
    print(wb.sheetnames)
    return wb


def diff(base_wb, comp_wb):
    """Perfom diffing logics here."""
    ...
    return "Diffing Completed!!"
