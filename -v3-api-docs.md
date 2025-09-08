# OpenAPI definition


**简介**:OpenAPI definition


**HOST**:http://175.27.247.250


**联系人**:


**Version**:v0


**接口路径**:/v3/api-docs


[TOC]






# 用户信息管理


## 更新用户信息


**接口地址**:`/api/profile/update`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>更新用户名、昵称、邮箱，每个字段一个月只能修改一次</p>



**请求示例**:


```javascript
{
  "username": "",
  "nickname": "",
  "email": "",
  "emailVerificationCode": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|updateProfileRequest|UpdateProfileRequest|body|true|UpdateProfileRequest|UpdateProfileRequest|
|&emsp;&emsp;username|||false|string||
|&emsp;&emsp;nickname|||false|string||
|&emsp;&emsp;email|||false|string||
|&emsp;&emsp;emailVerificationCode|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProfileUpdateResult|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||ProfileUpdateResult|ProfileUpdateResult|
|&emsp;&emsp;updatedFields||object||
|&emsp;&emsp;restrictedFields||object||
|&emsp;&emsp;userInfo||LoginResponse|LoginResponse|
|&emsp;&emsp;&emsp;&emsp;token||string||
|&emsp;&emsp;&emsp;&emsp;userId||integer||
|&emsp;&emsp;&emsp;&emsp;username||string||
|&emsp;&emsp;&emsp;&emsp;nickname||string||
|&emsp;&emsp;&emsp;&emsp;email||string||
|&emsp;&emsp;&emsp;&emsp;avatarUrl||string||
|&emsp;&emsp;&emsp;&emsp;role||string||
|&emsp;&emsp;&emsp;&emsp;points||integer||
|&emsp;&emsp;message||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"updatedFields": {},
		"restrictedFields": {},
		"userInfo": {
			"token": "",
			"userId": 0,
			"username": "",
			"nickname": "",
			"email": "",
			"avatarUrl": "",
			"role": "",
			"points": 0
		},
		"message": ""
	}
}
```


## 发送密码重置验证码


**接口地址**:`/api/profile/send-reset-code`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>通过邮箱发送密码重置验证码</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|email||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 重置密码


**接口地址**:`/api/profile/reset-password`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>通过邮箱验证码重置密码</p>



**请求示例**:


```javascript
{
  "email": "",
  "verificationCode": "",
  "newPassword": "",
  "confirmNewPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|resetPasswordRequest|ResetPasswordRequest|body|true|ResetPasswordRequest|ResetPasswordRequest|
|&emsp;&emsp;email|||true|string||
|&emsp;&emsp;verificationCode|||true|string||
|&emsp;&emsp;newPassword|||true|string||
|&emsp;&emsp;confirmNewPassword|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 修改密码


**接口地址**:`/api/profile/change-password`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户修改登录密码</p>



**请求示例**:


```javascript
{
  "currentPassword": "",
  "newPassword": "",
  "confirmNewPassword": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|changePasswordRequest|ChangePasswordRequest|body|true|ChangePasswordRequest|ChangePasswordRequest|
|&emsp;&emsp;currentPassword|||true|string||
|&emsp;&emsp;newPassword|||true|string||
|&emsp;&emsp;confirmNewPassword|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 密码强度要求


**接口地址**:`/api/profile/password-strength`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取密码强度要求说明</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


# 用户认证


## 发送短信验证码


**接口地址**:`/api/auth/send-sms-code`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>发送手机验证码用于注册或登录</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|phone||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 发送邮箱验证码


**接口地址**:`/api/auth/send-email-code`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>发送邮箱验证码用于注册或登录</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|email||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 用户注册


**接口地址**:`/api/auth/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>支持邮箱和手机号注册</p>



**请求示例**:


```javascript
{
  "username": "",
  "nickname": "",
  "email": "",
  "phone": "",
  "password": "",
  "confirmPassword": "",
  "verificationCode": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|registerRequest|RegisterRequest|body|true|RegisterRequest|RegisterRequest|
|&emsp;&emsp;username|||true|string||
|&emsp;&emsp;nickname|||false|string||
|&emsp;&emsp;email|||false|string||
|&emsp;&emsp;phone|||false|string||
|&emsp;&emsp;password|||true|string||
|&emsp;&emsp;confirmPassword|||true|string||
|&emsp;&emsp;verificationCode|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultUser|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||User|User|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;username||string||
|&emsp;&emsp;nickname||string||
|&emsp;&emsp;email||string||
|&emsp;&emsp;phone||string||
|&emsp;&emsp;passwordHash||string||
|&emsp;&emsp;authSource|可用值:EMAIL,PHONE,WECHAT,GITHUB,GOOGLE|string||
|&emsp;&emsp;openId||string||
|&emsp;&emsp;avatarUrl||string||
|&emsp;&emsp;role|可用值:USER,ADMIN,MODERATOR|string||
|&emsp;&emsp;points||integer(int32)||
|&emsp;&emsp;createdAt||string(date-time)||
|&emsp;&emsp;updatedAt||string(date-time)||
|&emsp;&emsp;nicknameUpdatedAt||string(date-time)||
|&emsp;&emsp;usernameUpdatedAt||string(date-time)||
|&emsp;&emsp;emailUpdatedAt||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"username": "",
		"nickname": "",
		"email": "",
		"phone": "",
		"passwordHash": "",
		"authSource": "",
		"openId": "",
		"avatarUrl": "",
		"role": "",
		"points": 0,
		"createdAt": "",
		"updatedAt": "",
		"nicknameUpdatedAt": "",
		"usernameUpdatedAt": "",
		"emailUpdatedAt": ""
	}
}
```


## 用户登录


**接口地址**:`/api/auth/login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>支持邮箱、手机号、用户名、GitHub多种登录方式</p>



**请求示例**:


```javascript
{
  "loginType": "",
  "identifier": "",
  "password": "",
  "verificationCode": "",
  "authCode": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|loginRequest|LoginRequest|body|true|LoginRequest|LoginRequest|
|&emsp;&emsp;loginType|||true|string||
|&emsp;&emsp;identifier|||true|string||
|&emsp;&emsp;password|||false|string||
|&emsp;&emsp;verificationCode|||false|string||
|&emsp;&emsp;authCode|||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginResponse|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||LoginResponse|LoginResponse|
|&emsp;&emsp;token||string||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;username||string||
|&emsp;&emsp;nickname||string||
|&emsp;&emsp;email||string||
|&emsp;&emsp;avatarUrl||string||
|&emsp;&emsp;role||string||
|&emsp;&emsp;points||integer(int32)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"token": "",
		"userId": 0,
		"username": "",
		"nickname": "",
		"email": "",
		"avatarUrl": "",
		"role": "",
		"points": 0
	}
}
```


## GitHub登录回调


**接口地址**:`/api/auth/github/callback`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>GitHub OAuth登录回调处理</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|code||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginResponse|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||LoginResponse|LoginResponse|
|&emsp;&emsp;token||string||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;username||string||
|&emsp;&emsp;nickname||string||
|&emsp;&emsp;email||string||
|&emsp;&emsp;avatarUrl||string||
|&emsp;&emsp;role||string||
|&emsp;&emsp;points||integer(int32)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"token": "",
		"userId": 0,
		"username": "",
		"nickname": "",
		"email": "",
		"avatarUrl": "",
		"role": "",
		"points": 0
	}
}
```


# 积分管理


## 获取积分流水


**接口地址**:`/api/points/history`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前用户的积分变动历史</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page||query|false|integer(int32)||
|size||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListPointTransaction|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||array|PointTransaction|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;amount||integer(int32)||
|&emsp;&emsp;type|可用值:TASK_REWARD,REDEMPTION,ADJUSTMENT|string||
|&emsp;&emsp;description||string||
|&emsp;&emsp;referenceId||integer(int64)||
|&emsp;&emsp;createdAt||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": [
		{
			"id": 0,
			"userId": 0,
			"amount": 0,
			"type": "",
			"description": "",
			"referenceId": 0,
			"createdAt": ""
		}
	]
}
```


## 获取积分余额


**接口地址**:`/api/points/balance`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前用户的积分余额</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultInteger|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||integer(int32)|integer(int32)|


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": 0
}
```


# 任务管理


## 获取任务列表


**接口地址**:`/api/tasks`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>分页获取任务列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page||query|false|integer(int32)||
|size||query|false|integer(int32)||
|status||query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageTask|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||PageTask|PageTask|
|&emsp;&emsp;records||array|Task|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;title||string||
|&emsp;&emsp;&emsp;&emsp;description||string||
|&emsp;&emsp;&emsp;&emsp;points||integer||
|&emsp;&emsp;&emsp;&emsp;status|可用值:OPEN,CLOSED|string||
|&emsp;&emsp;&emsp;&emsp;creatorId||integer||
|&emsp;&emsp;&emsp;&emsp;createdAt||string||
|&emsp;&emsp;&emsp;&emsp;updatedAt||string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageTask|PageTask|
|&emsp;&emsp;searchCount||PageTask|PageTask|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"records": [
			{
				"id": 0,
				"title": "",
				"description": "",
				"points": 0,
				"status": "",
				"creatorId": 0,
				"createdAt": "",
				"updatedAt": ""
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	}
}
```


## 创建任务


**接口地址**:`/api/tasks`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员创建新任务</p>



**请求示例**:


```javascript
{
  "title": "",
  "description": "",
  "points": 0
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|createTaskRequest|CreateTaskRequest|body|true|CreateTaskRequest|CreateTaskRequest|
|&emsp;&emsp;title|||true|string||
|&emsp;&emsp;description|||true|string||
|&emsp;&emsp;points|||true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultTask|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||Task|Task|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;title||string||
|&emsp;&emsp;description||string||
|&emsp;&emsp;points||integer(int32)||
|&emsp;&emsp;status|可用值:OPEN,CLOSED|string||
|&emsp;&emsp;creatorId||integer(int64)||
|&emsp;&emsp;createdAt||string(date-time)||
|&emsp;&emsp;updatedAt||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"title": "",
		"description": "",
		"points": 0,
		"status": "",
		"creatorId": 0,
		"createdAt": "",
		"updatedAt": ""
	}
}
```


## 关闭任务


**接口地址**:`/api/tasks/{taskId}/close`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员关闭任务</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|taskId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 提交任务


**接口地址**:`/api/tasks/submit`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>用户提交任务内容</p>



**请求示例**:


```javascript
{
  "taskId": 0,
  "content": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|submitTaskRequest|SubmitTaskRequest|body|true|SubmitTaskRequest|SubmitTaskRequest|
|&emsp;&emsp;taskId|||true|integer(int64)||
|&emsp;&emsp;content|||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultTaskSubmission|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||TaskSubmission|TaskSubmission|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;taskId||integer(int64)||
|&emsp;&emsp;userId||integer(int64)||
|&emsp;&emsp;content||string||
|&emsp;&emsp;status|可用值:PENDING,APPROVED,REJECTED|string||
|&emsp;&emsp;submittedAt||string(date-time)||
|&emsp;&emsp;reviewedAt||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"taskId": 0,
		"userId": 0,
		"content": "",
		"status": "",
		"submittedAt": "",
		"reviewedAt": ""
	}
}
```


## 审核提交


**接口地址**:`/api/tasks/review/{submissionId}`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员审核任务提交</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|submissionId||path|true|integer(int64)||
|status||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultString|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||string||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": ""
}
```


## 获取任务详情


**接口地址**:`/api/tasks/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据ID获取任务详情</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultTask|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||Task|Task|
|&emsp;&emsp;id||integer(int64)||
|&emsp;&emsp;title||string||
|&emsp;&emsp;description||string||
|&emsp;&emsp;points||integer(int32)||
|&emsp;&emsp;status|可用值:OPEN,CLOSED|string||
|&emsp;&emsp;creatorId||integer(int64)||
|&emsp;&emsp;createdAt||string(date-time)||
|&emsp;&emsp;updatedAt||string(date-time)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"id": 0,
		"title": "",
		"description": "",
		"points": 0,
		"status": "",
		"creatorId": 0,
		"createdAt": "",
		"updatedAt": ""
	}
}
```


## 获取待审核提交


**接口地址**:`/api/tasks/pending-submissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>管理员获取待审核的提交列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page||query|false|integer(int32)||
|size||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageTaskSubmission|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||PageTaskSubmission|PageTaskSubmission|
|&emsp;&emsp;records||array|TaskSubmission|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;taskId||integer||
|&emsp;&emsp;&emsp;&emsp;userId||integer||
|&emsp;&emsp;&emsp;&emsp;content||string||
|&emsp;&emsp;&emsp;&emsp;status|可用值:PENDING,APPROVED,REJECTED|string||
|&emsp;&emsp;&emsp;&emsp;submittedAt||string||
|&emsp;&emsp;&emsp;&emsp;reviewedAt||string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageTaskSubmission|PageTaskSubmission|
|&emsp;&emsp;searchCount||PageTaskSubmission|PageTaskSubmission|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"records": [
			{
				"id": 0,
				"taskId": 0,
				"userId": 0,
				"content": "",
				"status": "",
				"submittedAt": "",
				"reviewedAt": ""
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	}
}
```


## 获取我的提交


**接口地址**:`/api/tasks/my-submissions`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取当前用户的任务提交列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|page||query|false|integer(int32)||
|size||query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageTaskSubmission|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|message||string||
|data||PageTaskSubmission|PageTaskSubmission|
|&emsp;&emsp;records||array|TaskSubmission|
|&emsp;&emsp;&emsp;&emsp;id||integer||
|&emsp;&emsp;&emsp;&emsp;taskId||integer||
|&emsp;&emsp;&emsp;&emsp;userId||integer||
|&emsp;&emsp;&emsp;&emsp;content||string||
|&emsp;&emsp;&emsp;&emsp;status|可用值:PENDING,APPROVED,REJECTED|string||
|&emsp;&emsp;&emsp;&emsp;submittedAt||string||
|&emsp;&emsp;&emsp;&emsp;reviewedAt||string||
|&emsp;&emsp;total||integer(int64)||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;optimizeCountSql||PageTaskSubmission|PageTaskSubmission|
|&emsp;&emsp;searchCount||PageTaskSubmission|PageTaskSubmission|
|&emsp;&emsp;optimizeJoinOfCountSql||boolean||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;countId||string||
|&emsp;&emsp;pages||integer(int64)||


**响应示例**:
```javascript
{
	"code": 0,
	"message": "",
	"data": {
		"records": [
			{
				"id": 0,
				"taskId": 0,
				"userId": 0,
				"content": "",
				"status": "",
				"submittedAt": "",
				"reviewedAt": ""
			}
		],
		"total": 0,
		"size": 0,
		"current": 0,
		"orders": [
			{
				"column": "",
				"asc": true
			}
		],
		"optimizeCountSql": {},
		"searchCount": {},
		"optimizeJoinOfCountSql": true,
		"maxLimit": 0,
		"countId": "",
		"pages": 0
	}
}
```