Estou desenvolvendo um sistema em que pessoas que compram produtos em grupo podem acompanhar a compra em tempo real.
Funciona assim: Supondo que eu sou um comerciante, eu estou em um grupo de compra e vendas do whatsapp, eu vou mandar uma mensagem do tipo: "Estou com planos de comprar calçados, e vou abrir uma lista para quem quiser também". Esse é o ponto central do sistema, monitorar essa lista, evitando assim várias perguntas no direct se o produto já chegou ou não.
Assim que eu criar a lista, eu vou ter a possibilidade de copiar o token que será gerado no backend, um token único para acompanhar o progresso da lista.
E os progressos são:

1. OPEN
2. FINISHED
3. PURCHASED
4. ON_PROCESS

Significado:

OPEN → lista aberta (aqui o dono da lista cria uma lista)
FINISHED → lista encerrada (aqui a lista é encerrada, porque todos os participantes já pagaram).
PURCHASED → compra feita (aqui a compra é feita, e todos já sabem).
ON_PROCESS → produto chegou no processo (aqui o(a) dono(a) da lista informa que o produto já está disponível nos processos, ponto pra aquisição imediata).

O sistema precisa ser seguro com axios e interceptors e rotas protegidas, impedindo assim que pessoas sem permissão, não acessem listas de outros donos. E uma lista não pode ser pública para todos, a não ser que o dono da lista, na hora da criação da lista, informa que a lista será pública via um componente que lembra um "switch", na hora da criação ou edição da lista.
E vai ter uma home pública com um Hero e um campo de busca via token, e precisa ter uma Navbar com FAQ's que virão do Backend, contatos e botão para Login e Cadastro no mesmo Modal.
Estando na minha conta, eu quero poder criar uma nova lista e poder editar o status da mesma e a sua visibilidade/disponibilidade), visto que o dono precisa ditar se a sua lista é pública ou é privada via switch.

Cria um layout muito bonito que deixa qualquer um impressionado, ele precisa ser muito moderno e lembrar um sistema SaaS, mas não muito complicado, porque o usuário não precisa de algo complicado, então cria um ótima UX também, facilitando bastante a vida dos usuários.

Obrigado!

Eu adicionei novas features.

##############

EndPoint : http://localhost:5000/users
Unique (email, telefone)
Method : POST

Request:

{
	"nome": "Miraldino Paulo Dória",
	"email": "miraldinodoria3@gmail.com",
	"telefone": 922225275,
	"senha": "111111"
}

Response (success)

{
	"status": "success",
	"code": 201,
	"message": "Usuário criado com sucesso.",
	"details": {},
	"data": {
		"id": "2998c058-36fa-4497-b291-2e29732f6c91",
		"nome": "Miraldino Paulo Dória",
		"email": "miraldinodoria3@gmail.com",
		"telefone": 922225275,
		"ativo": true,
		"created_at": "2026-03-15T23:14:02.196Z"
	}
}

Possibles Errors:

{
	"status": "error",
	"code": 409,
	"message": "O(a) 'email' que pretende cadastrar já existe.",
	"details": {
		"field": "undefined"
	},
	"data": {}
}

Others error message: "Informe um E-mail válido", "Informe todos os dados corretamenta"

##
EndPoint: http://localhost:5000/users/me
Method : GET
Authorization: Bearer Token

Response (success) - without list

{
	"status": "success",
	"code": 200,
	"message": "Meus dados",
	"details": {},
	"data": {
		"id": "2998c058-36fa-4497-b291-2e29732f6c91",
		"nome": "Miraldino Paulo Dória",
		"email": "miraldinodoria3@gmail.com",
		"telefone": 922225275,
		"role": "OWNER",
		"ativo": true,
		"created_at": "2026-03-15T23:14:02.196Z",
		"lists": []
	}
}

Response (success) - with list

{
	"status": "success",
	"code": 200,
	"message": "Meus dados",
	"details": {},
	"data": {
		"id": "2998c058-36fa-4497-b291-2e29732f6c91",
		"nome": "Miraldino Paulo Dória",
		"email": "miraldinodoria3@gmail.com",
		"telefone": 922225275,
		"role": "OWNER",
		"ativo": true,
		"created_at": "2026-03-15T23:14:02.196Z",
		"lists": [
			{
				"id": "7078665d-985c-417a-a865-4180a795793e",
				"produto": "Camisa do Petro",
				"foto": "1773621300263-camisola_petri.png",
				"status": "OPEN",
				"disponivel": false,
				"token": "ABBA7E28",
				"created_at": "2026-03-16T00:35:00.658Z",
				"userId": "2998c058-36fa-4497-b291-2e29732f6c91"
			}
		]
	}
}

#######

Auth

EndPoint: http://localhost:5000/auth
Method: POST

Request:

{
	"telefone": 922225271,
	"senha": "111111"
}

Response (success)

{
	"status": "success",
	"code": 200,
	"message": "Login feito com sucesso",
	"details": {},
	"data": {
		"user": {
			"id": "2998c058-36fa-4497-b291-2e29732f6c91",
			"nome": "Miraldino Paulo Dória"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOTk4YzA1OC0zNmZhLTQ0OTctYjI5MS0yZTI5NzMyZjZjOTEiLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE3NzM2MTc4MjksImV4cCI6MTc3MzYxODcyOX0.PALlvxH2SzyTEHLAb1UKFh0vJbi3e4TsQ_YXDlTdGl4",
		"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOTk4YzA1OC0zNmZhLTQ0OTctYjI5MS0yZTI5NzMyZjZjOTEiLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE3NzM2MTc4MjksImV4cCI6MTc3NDIyMjYyOX0.oDxibbxOfNlVhIHDqX7WszS4yYv3qgmP-KOvOc33JMc"
	}
}

Response (errors)

{
	"status": "error",
	"code": 401,
	"message": "Credenciais inválidas.",
	"details": {},
	"data": {}
}

{
	"status": "error",
	"code": 400,
	"message": "Informe um número com 9 digitos corretos. Ex: 9XXXXXXXX",
	"details": {},
	"data": {}
}

{
	"status": "error",
	"code": 401,
	"message": "Esta conta está temporariamente suspensa.",
	"details": {},
	"data": {}
}

##
EndPoint: http://localhost:5000/auth/refresh

Request:

{
	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOTk4YzA1OC0zNmZhLTQ0OTctYjI5MS0yZTI5NzMyZjZjOTEiLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE3NzM2MTgxMTQsImV4cCI6MTc3NDIyMjkxNH0.8-9ygHyShSswS_Wr9UvLLM1jsnV_jtRI36isxGTAfck"
}

Response (success)

{
	"status": "success",
	"code": 200,
	"message": "Refresh Token feito com sucesso.",
	"details": {},
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOTk4YzA1OC0zNmZhLTQ0OTctYjI5MS0yZTI5NzMyZjZjOTEiLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE3NzM2MTkwMTUsImV4cCI6MTc3MzYxOTkxNX0.cBZXEYGcr0AcP6mNVs1EZm4j3j9lTIpY9OEIT2ZKYHs"
	}
}

Response (error)

{
	"status": "error",
	"code": 401,
	"message": "Refresh Token inválido. Faça Login novamente.",
	"details": {},
	"data": {}
}

###
EndPoint: http://localhost:5000/lists
Method: POST
Authorization: Bearer Token

Request (multipart/form-data)

Input (text) - Name (produto)
Input (file) - Name (foto)

Response (success)

{
	"status": "success",
	"code": 201,
	"message": "Lista criada com sucesso.",
	"details": {},
	"data": {
		"id": "7078665d-985c-417a-a865-4180a795793e",
		"produto": "Camisa do Petro",
		"foto": "1773621300263-camisola_petri.png",
		"status": "OPEN",
		"disponivel": false,
		"token": "ABBA7E28",
		"created_at": "2026-03-16T00:35:00.658Z",
		"userId": "2998c058-36fa-4497-b291-2e29732f6c91"
	}
}

##
Minha Lista
EndPoint: http://localhost:5000/lists
Authorization: Bearer Token
Method: GET

{
	"status": "success",
	"code": 200,
	"message": "Minha lista",
	"details": {},
	"data": [
		{
			"id": "7078665d-985c-417a-a865-4180a795793e",
			"produto": "Camisa do Petro",
			"foto": "1773621300263-camisola_petri.png",
			"status": "OPEN",
			"disponivel": false,
			"token": "ABBA7E28",
			"created_at": "2026-03-16T00:35:00.658Z",
			"userId": "2998c058-36fa-4497-b291-2e29732f6c91"
		}
	]
}

####
Pesquisar lista via Token único

EndPoint: http://localhost:5000/lists/:token
Exemplo: http://localhost:5000/lists/ABBA7E28
Method: GET

Response (success)

{
	"status": "success",
	"code": 200,
	"message": "Lista encontrada.",
	"details": {},
	"data": {
		"id": "7078665d-985c-417a-a865-4180a795793e",
		"produto": "Camisa do Petro",
		"foto": "1773621300263-camisola_petri.png",
		"status": "OPEN",
		"disponivel": false,
		"token": "ABBA7E28",
		"created_at": "2026-03-16T00:35:00.658Z",
		"userId": "2998c058-36fa-4497-b291-2e29732f6c91",
		"user": {
			"id": "2998c058-36fa-4497-b291-2e29732f6c91",
			"nome": "Miraldino Paulo Dória",
			"telefone": 922225275
		}
	}
}

Response (error)

{
	"status": "error",
	"code": 404,
	"message": "Nenhuma lista encontrada.",
	"details": {},
	"data": {}
}


#######
Atualizar Status da Lista
EndPoint: http://localhost:5000/lists/:id
Exemplo: http://localhost:5000/lists/018748bb-7777-4770-b65e-1039c42f129e
Method: PATCH
Authorization: Bearer Token

Request:

{
	"status": "PURCHASED",
	"disponivel": true
}

Response (success) - (204 Not Content)

Response (error)

{
	"status": "error",
	"code": 403,
	"message": "Não foi possível atualizar a lista.",
	"details": {},
	"data": {}
}

{
	"status": "error",
	"code": 404,
	"message": "Lista não encontrada.",
	"details": {},
	"data": {}
}


######
ADMIN AREA

Foi adicionada a área administrativa no sistema.

Relatórios
EndPoint: http://localhost:5000/__admin302/relatorios
Method: GET
Authorization: Bearer Token

Request: (NoBody)

Response: (success)

{
	"status": "success",
	"code": 200,
	"message": "Relatório do Sistema",
	"details": {},
	"data": {
		"users": [
			{
				"id": "f933d210-0ce3-4d96-98e7-24cd36dd536d",
				"nome": "Miraldino Paulo Dória",
				"email": "miraldinodoria302@gmail.com",
				"telefone": 942225275,
				"role": "ADMIN",
				"ativo": true
			},
			{
				"id": "5f7b3b70-5e2f-47b0-b3a3-fb00a2fb0146",
				"nome": "Adriano",
				"email": "adriano@gmail.com",
				"telefone": 943849382,
				"role": "OWNER",
				"ativo": true
			}
		],
		"totalUsers": 2,
		"totalActives": 2,
		"totalDesactived": 0,
		"totalLists": 5,
		"totalOpen": 3,
		"totalFinished": 1,
		"totalPurchased": 1,
		"totalOnProcess": 0
	}
}

###
Desativar ou Ativar conta de usuário
EndPoint: http://localhost:5000/__admin302/accstatus/:id
Exemplo: http://localhost:5000/__admin302/accstatus/5f7b3b70-5e2f-47b0-b3a3-fb00a2fb0146
Authorization: Bearer Token
Method: PATCH

Request:

{
	"status": "false"
}

Response (success): (204 - Not Content)

Response (error):

{
	"status": "error",
	"code": 404,
	"message": "Usuário não encontrado.",
	"details": {},
	"data": {}
}

Agora contas desativadas não podem fazer login

http://localhost:5000/auth

{
	"telefone": 943849382,
	"senha": "111111111"
}

Response (conta desativada)

{
	"status": "error",
	"code": 401,
	"message": "Esta conta está temporariamente suspensa.",
	"details": {},
	"data": {}
}


####

Mudar a senha do OWNER e do ADMIN (users) e Recuperação de senha via E-mail

1. Mudar senha
EndPoint: http://localhost:5000/users/me/changePassword
Authorization: Bearer Token
Method: PUT

Request:

{
	"password": "111111",
	"newPassword": "222222"
}

Response: (success)

Response (success): (204 - Not Content)

Response (error):

{
	"status": "error",
	"code": 404,
	"message": "Usuário não encontrado.",
	"details": {},
	"data": {}
}

########
2. Recuperar a senhar via E-mail
###
Forgot Password
EndPoint: http://localhost:5000/auth/forgot-password
Method: POST
Request:

{
	"email": "miraldinopaulo2002@gmail.com"
}

Response (success):

{
	"status": "success",
	"code": 200,
	"message": "E-mail enviado com sucesso.",
	"details": {},
	"data": {}
}

Response (error):

{
	"status": "error",
	"code": 404,
	"message": "Se o email existir, enviaremos instruções.",
	"details": {},
	"data": {}
}

{
	"status": "error",
	"code": 401,
	"message": "Esta conta está temporariamente suspensa.",
	"details": {},
	"data": {}
}


###
Reset Password
EndPoint: http://localhost:5000/auth/reset-password/:token
Exemplo: http://localhost:5000/auth/reset-password/b0a038b2b7a90186830343b71ce16e1433a9f65fd6249392808cad81d9e32bec
Method: POST

Request:

{
	"password": "222222"
}

Response (success):

{
	"status": "success",
	"code": 200,
	"message": "Senha redefinida com sucesso.",
	"details": {},
	"data": {}
}


####
Atualizar o plano do usuário (FREE/PRO)

EndPoint: http://localhost:5000/users/:id/plan
Exemplo: http://localhost:5000/users/94893ddd-b02c-42dc-95f0-54bde76ee104/plan
Method: PUT

Request:

{
	"dias": 30
}

Response (sucess):

{
	"status": "success",
	"code": 200,
	"message": "Plano atualizado com sucesso.",
	"details": {},
	"data": {
		"id": "94893ddd-b02c-42dc-95f0-54bde76ee104",
		"nome": "Evandro Dória",
		"telefone": 922222222,
		"plan": "PRO",
		"planExpires": "2026-04-18T22:31:25.639Z"
	}
}

Response (error):

{
	"status": "error",
	"code": 404,
	"message": "Usuário não encontrado.",
	"details": {},
	"data": {}
}

{
	"status": "error",
	"code": 403,
	"message": "Esta conta está temporariamente suspensa.",
	"details": {},
	"data": {}
}

####
Agora ao registrar uma lista no plano FREE, o usuário tem apenas 10 listas, fora disso ele é barrado pelo sistema, pois atingiu o limite.

EndPoint: http://localhost:5000/lists
Method: POST
Authorization: Bearer Token

Request (multipart/form-data)

Input (text) - Name (produto)
Input (file) - Name (foto)

Response (success):

{
	"status": "success",
	"code": 201,
	"message": "Lista criada com sucesso.",
	"details": {},
	"data": {
		"id": "7078665d-985c-417a-a865-4180a795793e",
		"produto": "Camisa do Petro",
		"foto": "1773621300263-camisola_petri.png",
		"status": "OPEN",
		"disponivel": false,
		"token": "ABBA7E28",
		"createdAt": "2026-03-16T00:35:00.658Z",
		"userId": "2998c058-36fa-4497-b291-2e29732f6c91"
	}
}


Response (error) depois de 10 listas registradas:

{
	"status": "error",
	"code": 403,
	"message": "Você atingiu o limite de 10 listas do plano FREE.",
	"details": {},
	"data": {}
}

#####
UPDATE (Create Account)
Agora para criar usuários:

EndPoint: http://localhost:5000/users
Method: POST
Request:

{
	"nome": "Evandro Dória",
	"email": "evandro@gmail.com",
	"telefone": 922225273,
	"senha": "111111"
}

Response (success):

{
	"status": "success",
	"code": 201,
	"message": "Usuário criado com sucesso.",
	"details": {},
	"data": {
		"id": "94893ddd-b02c-42dc-95f0-54bde76ee104",
		"nome": "Evandro Dória",
		"email": "exemplo@gmail.com",
		"telefone": 922222222,
		"plan": "FREE",
		"planExpires": null,
		"level": 3
	}
}

######
Agora já é possível também registrar outros administradores.

EndPoint: http://localhost:5000/__admin302/register
Method: POST
Authorization: Bearer Token

Request:

{
	"nome": "Miraldino Paulo",
	"email": "miraldinopaulo@gmail.com",
	"telefone": 922225272,
	"senha": "111111"
}

Response (success):

{
	"status": "success",
	"code": 201,
	"message": "Administrador criado com sucesso.",
	"details": {},
	"data": {
		"id": "6836b1a2-5ae9-4d7e-8c80-2723bbcd68a3",
		"nome": "Miraldino Paulo",
		"email": "miraldinopaulo@gmail.com",
		"telefone": 922225272,
		"plan": null,
		"planExpires": null,
		"level": 2
	}
}

