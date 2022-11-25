"""Place holder for some sort of transformation."""

import logging
from typing import Union

from fastapi import APIRouter, Depends
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/transform", tags=["transform"])


class Item(BaseModel):
    des: str
    name: Union[str, None] = None


@router.post("/")
def transform(item_id: int, item: Item, a: str, b: str):
    """Some sort of transform task."""
    print(item)
    return {**item.dict(), "data": "ok"}


"""Try dependency injection"""


class MyService:
    def __init__(self, q=None, skip=0, limit=100):
        self.q = q
        self.skip = skip
        self.limit = limit
        self.data = self.get_data()

    def get_data(self):
        return "Some data retrieved"


@router.get("/try_di")
def try_di(
    mysvc: MyService = Depends(),
):  # short for mysvc: MyService = Depends(MyService)
    print(mysvc)
    return {"q": mysvc.q, "skip": mysvc.skip, "limit": mysvc.limit, "data": mysvc.data}
