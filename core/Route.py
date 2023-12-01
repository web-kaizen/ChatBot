import os

import requests
from .Methods import Methods


class Route(Methods):
    def __init__(self):
        self.parameters = []
        self.response = []
        self.APP_ID = os.getenv("APP_ID")
        print(True)
        self.BASE_URL = os.getenv("BASE_URL")
        print(False)


    def set_parameters(self, data):
        self.parameters = data

    def get_parameters(self):
        return self.parameters

    def set_response(self, response, status=None):
        if status is not None:
            if 200 <= status < 300:
                response = self.on_success(response)
            if 400 <= status <= 500:
                response = self.on_error(response)
        self.response = response

    def get_response(self):
        return self.response

    def send(self):
        url = f'{self.BASE_URL}{self.APP_ID}'
        response = requests.request(
            self.get_method(),
            f"{url}{self.get_patch()}",
            json=self.get_parameters()
        )
        return response.json(), response.status_code

    def on_success(self, response):
        return response

    def on_error(self, response):
        return response