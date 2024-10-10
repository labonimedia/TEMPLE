const express = require('express');
const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { subcategoryValidation } = require('../../../validations');
const { subcategoryController } = require('../../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'user'), validate(subcategoryValidation.createCategory), subcategoryController.createSubCategory)
  .get(auth('admin', 'user'), validate(subcategoryValidation.getCategories), subcategoryController.querySubCategorys);

router
  .route('/:subCategoryId')
  .get(auth('admin', 'user'), validate(subcategoryValidation.getCategoryById), subcategoryController.getSubCategoryById)
  .patch(auth('admin', 'user'), validate(subcategoryValidation.updateCategoryById), subcategoryController.updateSubCategoryById)
  .delete(auth('admin', 'user'), validate(subcategoryValidation.deleteCategoryById), subcategoryController.deleteSubCategoryById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: category management and retrieval
 */

/**
 * @swagger
 * /sub-category:
 *   post:
 *     summary: Create a category
 *     description: Only admins can create other category.
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               language:
 *                 type: string
 *               description:
 *                 type: string
 *                 format: text
 *             example:
 *               name: fake name
 *               categoryId: fake category
 *               language: 40
 *               description: sdfghj
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
 *     tags: [SubCategory]
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
 * /sub-category/{subCategoryId}:
 *   get:
 *     summary: Get a category
 *     description: Logged in category can fetch only their own user information. Only admins can fetch other users.
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subCategoryId
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
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subCategoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               language:
 *                 type: string
 *               description:
 *                 type: string
 *                 format: text
 *             example:
 *               name: fake name
 *               categoryId: fake category
 *               language: 20
 *               description: password1
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
 *     tags: [SubCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subCategoryId
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