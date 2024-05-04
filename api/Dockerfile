FROM python:3.12.3-bullseye

RUN mkdir /code

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1



RUN pip install --upgrade pip
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host=0.0.0.0", "--port=8000"]
