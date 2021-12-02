import csv
from datetime import datetime
from numpy.core.numeric import False_
import pandas as pd
from faker import Faker
import data_config
fake = Faker('ko_kr')


def get_species_data():
    sound = ['왈왈', '캉캉', '냥냥', '춉촙', '어흥',
             "Error!Error", "구구", "밥밥", "핑핑", "헤헤"]
    data = [(sound[fake.pyint(min_value=0, max_value=9)], fake.unique.town())
            for _ in range(100)]

    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/species_data.csv")


def get_habitat_data():

    data = [(fake.unique.city(), data_config.color[fake.pyint(min_value=0, max_value=13)], i)
            for i in range(50)]

    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/habitat_data.csv")


def get_user_data():

    data = [(f"test{i}", data_config.pwd, fake.name(), 1, fake.pyint(min_value=1, max_value=1), i)
            for i in range(1, 10000)]

    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/user_data.csv")


def get_contents_data():

    data = [(data_config.img_url_arr[fake.pyint(min_value=0, max_value=317)], 'image/webp')
            for _ in range(500000)]

    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/contents_data.csv")


def get_post_data():
    # fake.date_time_between(start_date="-3y", end_date="now")
    data = [(fake.bs(), fake.bs(), fake.pyint(min_value=1, max_value=9000), fake.pyint(min_value=1, max_value=49),
             fake.date_time_between(start_date="-3y", end_date="now"))
            for _ in range(50000)]
    data += [(fake.bs(), fake.bs(), fake.pyint(min_value=1, max_value=9000), 1,
              fake.date_time_between(start_date="-3y", end_date="now"))
             for _ in range(50000)]
    data += [(fake.bs(), fake.bs(), fake.pyint(min_value=1, max_value=9000), 1,
              fake.date_time_between(start_date="-7d", end_date="now"))
             for _ in range(50000)]
    data += [(fake.bs(), fake.bs(), fake.pyint(min_value=1, max_value=9000), fake.pyint(min_value=1, max_value=49),
              fake.date_time_between(start_date="-7d", end_date="now"))
             for _ in range(50000)]
    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/post_data.csv")


def get_post_contents_data():
    # fake.date_time_between(start_date="-3y", end_date="now")
    # 게시글당 이미지 추가 랜덤
    data = [(i, i)
            for i in range(1, 200001)]
    data += [(i-200000, i)
            for i in range(200001, 400000)]
    data += [(i-400000, i)
            for i in range(400001, 500000)]
    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/post_contents_data.csv", index=False)


def get_comments_data():
    # fake.date_time_between(start_date="-3y", end_date="now")
    data = [(fake.date_time_between(start_date="-7d", end_date="now"), fake.bs(), fake.pyint(min_value=1, max_value=199999), fake.pyint(min_value=1, max_value=9998))
            for i in range(1, 500000)]
    data += [(fake.date_time_between(start_date="-3y", end_date="now"), fake.bs(), fake.pyint(min_value=1, max_value=199999), fake.pyint(min_value=1, max_value=9998))
            for i in range(1, 500000)]
    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/comments_data.csv")


def get_heart_data():
    # fake.date_time_between(start_date="-3y", end_date="now")
    data = [(fake.pyint(min_value=1, max_value=9998), fake.pyint(min_value=1, max_value=199999))
            for i in range(1, 2000000)]
    data += [(fake.pyint(min_value=1, max_value=9998), fake.pyint(min_value=99999, max_value=149999))
            for i in range(1, 1000000)]
    df = pd.DataFrame(data)
    df.to_csv("./db/data_csv/heart_data.csv", index=False)


# datetime.datetime(2020, 8, 16, 21, 3, 18)
# get_species_data()
# get_habitat_data()
# get_user_data()# 1~9998
# get_contents_data()  # 1~499999 / 1~9999은 유저에서사용
# get_post_data()  # 1~199,999
# get_post_contents_data()  # 1~499999
# get_comments_data()  # 1~9,999,997
get_heart_data()
