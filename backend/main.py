from typing import Union
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uuid
import bson
from bson import ObjectId
from pydantic import Field, BaseModel
from pymongo import MongoClient
from dotenv import dotenv_values
from bson.objectid import ObjectId as BsonObjectId

class PydanticObjectId(BsonObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, BsonObjectId):
            raise TypeError('ObjectId required')
        return str(v)

config = dotenv_values(".env")


class Patient(BaseModel):
    id: PydanticObjectId = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    doctor: str = Field(...)
    enrolled_on: int = Field(...)
    age: int = Field(...)
    records: list[str] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "Sherlock Holmes",
                "doctor": "John Watson",
                "enrolled_on": 1676714911,
                "age": 32,
                "records": []
            }
        }


class Medicine(BaseModel):
    id: PydanticObjectId = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    expiry: int = Field(...)
    quantity: int = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "Paracetamol",
                "expiry": 1686715017,
                "quantity": 7
            }
        }

class Consultation(BaseModel):
    id: PydanticObjectId = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    expiry: int = Field(...)
    quantity: int = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "name": "Paracetamol",
                "expiry": 1686715017,
                "quantity": 7
            }
        }
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"]
)

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client=MongoClient("localhost", 27017)
    # app.mongodb_client = MongoClient(config["MONGO_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/api/patient", response_description="Get a list of patients", response_model=list[Patient])
def patients(request: Request):
    patients = list(request.app.database["Patients"].find(limit=100))
    return patients


@app.get("/api/patient/{patient_id}", response_description="Get a patient by id", response_model=Patient | None)
def patient(patient_id: str, request:Request):
    if not bson.objectid.ObjectId.is_valid(patient_id): return None
    patient=request.app.database["Patients"].find_one({"_id":ObjectId(patient_id)})
    return patient

@app.get("/api/medicine", response_description="Get a list of medicines", response_model=list[Medicine])
def medicines(request: Request):
    medicines = list(request.app.database["Medicines"].find(limit=100))
    return medicines


@app.get("/api/medicine/{medicine_id}", response_description="Get a medicine by id", response_model=Medicine | None)
def medicine(medicine_id: str, request:Request):
    if not bson.objectid.ObjectId.is_valid(medicine_id): return None
    medicine=request.app.database["Medicines"].find_one({"_id":ObjectId(medicine_id)})
    return medicine

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
