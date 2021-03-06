# -*- coding:utf-8 -*-
from ais_sdk.gettoken import get_token
from ais_sdk.asr_bgm import asr_bgm
from ais_sdk.asr_bgm import asr_bgm_aksk

if __name__ == '__main__':
    #
    # access asr, asr_bgm,post data by token
    #
    user_name = '******'
    password = '******'
    account_name = '******'  # the same as user_name in commonly use

    demo_data_url = 'https://obs-test-llg.obs.cn-north-1.myhwclouds.com/bgm_recognition'
    token = get_token(user_name, password, account_name)

    # call interface use the url
    result = asr_bgm(token, demo_data_url)
    print (result)

    #
    # access asr, asr_bgm,post data by ak,sk
    #
    app_key = "*************"
    app_secret = "************"

    demo_data_url = 'https://obs-test-llg.obs.cn-north-1.myhwclouds.com/bgm_recognition'
    result = asr_bgm_aksk(app_key, app_secret, demo_data_url)
    print(result)