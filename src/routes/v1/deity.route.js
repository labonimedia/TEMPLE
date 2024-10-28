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
    commonUploadMiddleware([
      { name: 'coverImage', maxCount: 1 },
      { name: 'iconImage', maxCount: 1 },
      { name: 'coverImage1', maxCount: 1 },
      { name: 'iconImage1', maxCount: 1 },
    ]),
    deityController.createDeity
  )
  .get(validate(deityValidation.getDeitys), deityController.queryDeitys);

router
  .route('/:deityId')
  .get( validate(deityValidation.getDeityById), deityController.getDeityById)
  .patch(
    auth('admin', 'user'),
    commonUploadMiddleware([
      { name: 'coverImage', maxCount: 1 },
      { name: 'iconImage', maxCount: 1 },
    ]),
    deityController.updateDeityById
  )
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
 *     summary: Create a deity
 *     description: Only admins can create a deity.
 *     tags: [Deity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               en_name:
 *                 type: string
 *               en_description:
 *                 type: string
 *                 format: text
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               iconImage:
 *                 type: string
 *                 format: binary
 *               en_categoryId:
 *                 type: string
 *               en_subCategoryId:
 *                 type: string
 *               en_introduction:
 *                 type: string
 *               en_mythologicalStory:
 *                 type: string
 *               en_symbols:
 *                 type: string
 *               en_roleSignificance:
 *                 type: string
 *               en_festivalsRituals:
 *                 type: string
 *               en_templesSites:
 *                 type: string
 *               en_significance:
 *                 type: string
 *               en_conclusion:
 *                 type: string
 *               hd_name:
 *                 type: string
 *               hd_description:
 *                 type: string
 *                 format: text
 *               hd_categoryId:
 *                 type: string
 *               hd_subCategoryId:
 *                 type: string
 *               hd_introduction:
 *                 type: string
 *               hd_mythologicalStory:
 *                 type: string
 *               hd_symbols:
 *                 type: string
 *               hd_roleSignificance:
 *                 type: string
 *               hd_festivalsRituals:
 *                 type: string
 *               hd_templesSites:
 *                 type: string
 *               hd_significance:
 *                 type: string
 *               hd_conclusion:
 *                 type: string
 *             example:
 *               en_name: "Example Deity"
 *               en_description: "Description of the deity."
 *               coverImage: //example.com/path/to/image
 *               iconImage: //example.com/path/to/icon
 *               en_categoryId: "605c72ef27e20d001f1d2a1f"
 *               en_subCategoryId: "605c72ef27e20d001f1d2a20"
 *               en_introduction: "Introduction text."
 *               en_mythologicalStory: "Mythological story text."
 *               en_symbols: "Symbols associated with the deity."
 *               en_roleSignificance: "Role and significance of the deity."
 *               en_festivalsRituals: "Festivals and rituals."
 *               en_templesSites: "Temples and sites."
 *               en_significance: "Significance of the deity."
 *               en_conclusion: "Conclusion about the deity."
 *               hd_name: "उदाहरण देवता"
 *               hd_description: "देवता का विवरण।"
 *               hd_categoryId: "605c72ef27e20d001f1d2a1f"
 *               hd_subCategoryId: "605c72ef27e20d001f1d2a20"
 *               hd_introduction: "परिचय पाठ।"
 *               hd_mythologicalStory: "पौराणिक कहानी पाठ।"
 *               hd_symbols: "देवता से जुड़े प्रतीक।"
 *               hd_roleSignificance: "देवता की भूमिका और महत्व।"
 *               hd_festivalsRituals: "त्योहार और अनुष्ठान।"
 *               hd_templesSites: "मंदिर और स्थलों।"
 *               hd_significance: "देवता का महत्व।"
 *               hd_conclusion: "देवता के बारे में निष्कर्ष।"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Deity'
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
