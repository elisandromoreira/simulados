/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Operações relacionadas a quizzes
 */

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Cria um novo quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - isPublic
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     explanation:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           content:
 *                             type: string
 *                           isCorrect:
 *                             type: boolean
 *     responses:
 *       201:
 *         description: Quiz criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * /quizzes/{quizId}/questions:
 *   post:
 *     summary: Adiciona questões a um quiz existente
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questions
 *             properties:
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                     explanation:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           content:
 *                             type: string
 *                           isCorrect:
 *                             type: boolean
 *     responses:
 *       200:
 *         description: Questões adicionadas com sucesso
 *       400:
 *         description: Formato inválido para as questões
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão para editar este quiz
 *       404:
 *         description: Quiz não encontrado
 *       500:
 *         description: Erro do servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         authorId:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: string
 *         explanation:
 *           type: string
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Option'
 *
 *     Option:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: string
 *         isCorrect:
 *           type: boolean
 *
 * /quizzes/{quizId}:
 *   put:
 *     summary: Atualiza um simulado existente
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do simulado a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Simulado atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 quiz:
 *                   $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Sem permissão para editar o simulado
 *       404:
 *         description: Simulado não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
