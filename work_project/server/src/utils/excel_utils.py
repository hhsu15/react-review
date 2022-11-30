from fastapi import WebSocket
from openpyxl import load_workbook, Workbook
from typing import Union
from io import BytesIO


def load_wb(filename: Union[str, BytesIO]) -> Workbook:
    wb = load_workbook(filename)
    return wb
