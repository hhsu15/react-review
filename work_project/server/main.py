from fastapi import FastAPI
from io import BytesIO
import logging
from typing import Union, Dict
from pydantic import BaseModel

import openpyxl

from fastapi import FastAPI, File, Form, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Let's fly"}


@app.post("/api/diff")
async def upload_files(baseFile: UploadFile, compareToFile: UploadFile) -> dict:

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
    return "Diffing Completed!!"
