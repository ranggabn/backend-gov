/**
 * @swagger
 * /kartan/getSubsektor:
 *   get:
 *     summary: Get Subsektor
 *     tags: [Kartu Tani]
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getKomoditas:
 *   get:
 *     summary: Get Komoditas
 *     tags: [Kartu Tani]
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getSummaryPenebusan:
 *   get:
 *     summary: Get Summary Penebusan
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: komoditas
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getSummaryTransaksi:
 *   get:
 *     summary: Get Summary Transaksi
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: komoditas
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getDataPenyaluran:
 *   get:
 *     summary: Get Data Penyaluran Pupuk Subsidi
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: segment
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: komoditas
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: page
 *            default: 1
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *          - name: filter
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/detailPenyaluran:
 *   get:
 *     summary: Get Detail Penyaluran
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: nm_propinsi
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kabupaten
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kecamatan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kelurahan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: id_kelompok_tani
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: kode_pihc_pengecer
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: no_ktp_petani
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: komoditas
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: page
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getDataPenebusan:
 *   get:
 *     summary: Get Data Penebusan Pupuk Harian
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: segment
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: komoditas
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: page
 *            default: 1
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *          - name: filter
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/detailPenebusan:
 *   get:
 *     summary: Get Detail Penebusan
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: nm_propinsi
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kabupaten
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kecamatan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kelurahan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: id_poktan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nik
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: kode_kios
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: komoditas
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: page
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getDataTransaksi:
 *   get:
 *     summary: Get Data Transaksi
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: segment
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tahun
 *            default: 2023
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: page
 *            default: 1
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *          - name: filter
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/detailTransaksi:
 *   get:
 *     summary: Get Detail Transaksi
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2023
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: id_retail
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: id_poktan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nik
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: page
 *            default: 1
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getPenyaluranKomoditas:
 *   get:
 *     summary: Get Data Penyaluran Pupuk Subsidi (Komoditas)
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: segment
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: jenis_pupuk
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: page
 *            default: 1
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *          - name: filter
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/detailPenyaluranKomoditas:
 *   get:
 *     summary: Get Detail Penyaluran (Komoditas)
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: nm_propinsi
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kabupaten
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kecamatan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kelurahan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: id_kelompok_tani
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: kode_pihc_pengecer
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: no_ktp_petani
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: jenis_pupuk
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: page
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/getPenebusanKomoditas:
 *   get:
 *     summary: Get Data Penebusan Pupuk Harian (Komoditas)
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: segment
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: jenis_pupuk
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tahun
 *            default: 2023
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: page
 *            default: 1
 *            in: query
 *            required: true
 *            schema:
 *              type: integer
 *          - name: filter
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */

/**
 * @swagger
 * /kartan/detailPenebusanKomoditas:
 *   get:
 *     summary: Get Detail Penebusan (Komoditas)
 *     tags: [Kartu Tani]
 *     parameters:
 *          - name: tahun
 *            default: 2022
 *            in: query
 *            required: true
 *            schema:
 *              type: string
 *          - name: nm_propinsi
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kabupaten
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kecamatan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nm_kelurahan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: id_poktan
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: nik
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: kode_kios
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: tanggal_start
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: tanggal_end
 *            default: ""
 *            in: query
 *            schema:
 *              type: date
 *          - name: jenis_pupuk
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *          - name: page
 *            default: ""
 *            in: query
 *            schema:
 *              type: string
 *     responses:
 *          default:
 *              description: This is the default response for it
 */
