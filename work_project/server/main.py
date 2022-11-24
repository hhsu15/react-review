from pickletools import read_uint1
from fastapi import FastAPI, Request
from io import BytesIO
import logging
from typing import Union, Dict
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse


import openpyxl

from fastapi import FastAPI, File, Form, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = FastAPI()

app.mount(
    "/static", StaticFiles(directory="../excel-loader/build/static"), name="static"
)
templates = Jinja2Templates(directory="../excel-loader/build")


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


class Item(BaseModel):
    des: str
    name: Union[str, None] = None


@app.post("/api/{item_id}/transform")
def transform(item_id: int, item: Item, a: str, b: str):
    """Some sort of transform task."""
    print(item)
    return {**item.dict(), "data": "ok"}


@app.post("/api/diff")
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
    return "Diffing Completed!!"
