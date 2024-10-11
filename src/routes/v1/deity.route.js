const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { deityValidation } = require('../../validations');
const { deityController } = require('../../controllers');
const { commonUploadMiddleware } = require('../../utils/upload');

const router = express.Router();

router
  .route('/')
  .post(
    auth('admin', 'user'),
    commonUploadMiddleware([{ name: 'coverImage', maxCount: 1 }, {name: 'iconImage', maxCount:1}]),
    deityController.createDeity
  )
  .get(auth('admin', 'user'), validate(deityValidation.getDeitys), deityController.queryDeitys);

router
  .route('/:deityId')
  .get(auth('admin', 'user'), validate(deityValidation.getDeityById), deityController.getDeityById)
  .patch(auth('admin', 'user'),  commonUploadMiddleware([{ name: 'coverImage', maxCount: 1 }, {name: 'iconImage', maxCount:1}]), deityController.updateDeityById)
  .delete(auth('admin', 'user'), validate(deityValidation.deleteDeityById), deityController.deleteDeityById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Deity
 *   description: category management and retrieval
 */

/**
 * @swagger
 * /deity:
 *   post:
 *     summary: Create a category
 *     description: Only admins can create other category.
 *     tags: [Deity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 format: text
 *               iconImage:
 *                 type: string
 *                 format: binary
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *                 format: text
 *               language:
 *                 type: String
 *               discription1:
 *                 type: string
 *               discription2:
 *                 type: string
 *                 format: text
 *               discription3:
 *                 type: String
 *               discription4:
 *                 type: String
 *             example:
 *               name: fake name
 *               description: sdfghj
 *               iconImage: //ad/aa/a
 *               coverImage: //ad/aa/a
 *               categoryId: 139r789
 *               subCategoryId: 482668
 *               language: "20"
 *               discription1: fake
 *               discription2: fake
 *               discription3: fake
 *               discription4: fake
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all category
 *     description: Only admins can retrieve allcategory.
 *     tags: [Deity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /deity/{deityId}:
 *   get:
 *     summary: Get a category
 *     description: Logged in category can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Deity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Category
 *     description: Logged in Category can only update their own information. Only admins can update other users.
 *     tags: [Deity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deityId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 format: text
 *               iconImage:
 *                 type: string
 *                 format: binary
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               categoryId:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *                 format: text
 *               language:
 *                 type: String
 *               discription1:
 *                 type: string
 *               discription2:
 *                 type: string
 *                 format: text
 *               discription3:
 *                 type: String
 *               discription4:
 *                 type: String
 *             example:
 *               name: fake name
 *               description: sdfghj
 *               iconImage: //ad/aa/a
 *               coverImage: //ad/aa/a
 *               categoryId: 139r789
 *               subCategoryId: 482668
 *               language: "20"
 *               discription1: fake
 *               discription2: fake
 *               discription3: fake
 *               discription4: fake
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Category
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Deity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deityId
 *         required: true
 *         schema:
 *           type: string
 *         description: category id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
