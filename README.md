Base URL: http://localhost:5000/

EndPoits:

POST /users/

Request

{
	"name": "Miraldino Paulo Dória",
	"email": "miraldino@gmail.com",
	"password": "111111"
}

Response (success)

{
	"status": "success",
	"code": 201,
	"message": "Usuário registrado com sucesso.",
	"details": {},
	"data": {
		"id": "ec6fd731-1c1e-42e1-a784-ce70b4c92e4a",
		"name": "Miraldino Paulo Dória",
		"email": "miraldino@gmail.com"
	}
}

POST /auth/

Request

{
	"email": "miraldino2@gmail.com",
	"password": "111111"
}

Response (success)

{
	"status": "success",
	"code": 200,
	"message": "Login feito com sucesso.",
	"details": {},
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDkzZmIzNy0yZmQwLTQ1MDEtYmMyMy0yOTAxNGRlZGE4ZTIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MzM2MTcwOSwiZXhwIjoxNzczMzYxNzI0fQ.yE_xPkeDDsjop1Mp51garDFIdDOSr929pwHax7WVEB4",
		"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDkzZmIzNy0yZmQwLTQ1MDEtYmMyMy0yOTAxNGRlZGE4ZTIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MzM2MTcwOSwiZXhwIjoxNzczOTY2NTA5fQ.Mdy3uBDVi3hy875HAjDDqfOkXsjWLwHCawT_LZODHc4",
		"user": {
			"id": "1093fb37-2fd0-4501-bc23-29014deda8e2",
			"name": "Miraldino Paulo Dória 2"
		}
	}
}

Response (invalid_credentials)

{
	"status": "error",
	"code": 401,
	"message": "Credenciais inválidas",
	"details": {},
	"data": {}
}

POST /auth/refresh

Request

{
	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDkzZmIzNy0yZmQwLTQ1MDEtYmMyMy0yOTAxNGRlZGE4ZTIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MzM2Mjk0NCwiZXhwIjoxNzczOTY3NzQ0fQ.sP1qbV-SuIktb2m_Q8SCsla2LFuwn_3oy76xpErLScA"
}

Response (success)

{
	"status": "success",
	"code": 200,
	"message": "Token atualizado com sucesso.",
	"details": {},
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDkzZmIzNy0yZmQwLTQ1MDEtYmMyMy0yOTAxNGRlZGE4ZTIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MzM2Mzg1MSwiZXhwIjoxNzczMzYzODY2fQ.7m76vS3WFUzsBuMJFpewuWR9ngqNPZ8gzSKHBTYYPOg"
	}
}

Response (refresh_token_not_found)

{
	"status": "error",
	"code": 401,
	"message": "Refresh Token não encontrado. Faça login novamente.",
	"details": {},
	"data": {}
}


POST /tasks (Token Bearer)

{
	"title": "Criar uma API de tasks"
}

Response

{
	"status": "success",
	"code": 201,
	"message": "Tarefa criada com sucesso.",
	"details": {},
	"data": {
		"id": "056f344f-f3d4-42ac-89d9-a52ef1c06059",
		"title": "Criar uma API de Tasks",
		"description": null,
		"completed": false,
		"userId": "1093fb37-2fd0-4501-bc23-29014deda8e2"
	}
}

Trecho do Controller (taskController)

async create(req: Request, res: Response){
	const taskData = createTaskSchema.safeParse(req.body);
	if(taskData.error){
		send_zod_response_error(res, taskData.error);
		return;
	}
	try{
		const userId = (req as any).userId
		const task = await taskService.create(userId, taskData.data);
		if(task){
			send_201_response(res, "Tarefa criada com sucesso.", task);
		}
	}catch(error){
		send_response_error(res, error);
	}
}
