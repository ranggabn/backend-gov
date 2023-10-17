/**
 * @swagger
 * /:
 *   get:
 *     summary: Check server
 *     tags: [Index]
 *     responses:
 *          default:
 *              description: This is the default response for it
 *
 */

/**
 * @swagger
 * /editProfil:
 *  put:
 *      summary: Edit Profil
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: rangga.baghas
 *                          email:
 *                              type: string
 *                              default: rbaghas32@gmail.com
 *                          nama_lengkap:
 *                              type: string
 *                              default: Rangga Baghas Nugroho
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /ubahPassword:
 *  put:
 *      summary: Ubah Password
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: rangga.baghas
 *                          old_password:
 *                              type: string
 *                              default: xxxxxx
 *                          new_password:
 *                              type: string
 *                              default: xxxxxx
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /auth/api/login:
 *  post:
 *      summary: Login user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              default: rangga.baghas
 *                          password:
 *                              type: string
 *                              default: Bsi12345
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
