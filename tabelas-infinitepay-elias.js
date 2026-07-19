/*
 * Dados comerciais aprovados conforme as tabelas fornecidas por Elias.
 *
 * Fonte de verdade:
 * - valores à vista;
 * - valores totais no crédito;
 * - valores das parcelas.
 *
 * Não recalcular por fórmula, pois existem arredondamentos específicos
 * nas tabelas comerciais aprovadas.
 */

const INFINITEPAY_APPROVED_DATA = {
  rates: {
    1: 4.20,
    2: 6.09,
    3: 7.01,
    4: 7.91,
    5: 8.80,
    6: 9.67,
    7: 12.59,
    8: 13.42,
    9: 14.25,
    10: 15.06,
    11: 15.87,
    12: 16.66
  },

  plans: {
    /*
     * =========================================================
     * PLANO LITE
     * =========================================================
     */

    lite: {
      label: 'Plano Lite',

      defaultOption: 'mensal',

      optionOrder: [
        'mensal',
        'trimestral',
        'semestral',
        'anual'
      ],

      options: {
        mensal: {
          label: 'Mensal',

          base: 199.90,

          credit: {
            1: {
              total: 208.66,
              installment: 208.66
            },

            2: {
              total: 212.85,
              installment: 106.43
            },

            3: {
              total: 214.96,
              installment: 71.65
            },

            4: {
              total: 217.09,
              installment: 54.27
            },

            5: {
              total: 219.21,
              installment: 43.84
            },

            6: {
              total: 221.31,
              installment: 36.89
            },

            7: {
              total: 228.69,
              installment: 32.67
            },

            8: {
              total: 230.87,
              installment: 28.86
            },

            9: {
              total: 233.12,
              installment: 25.90
            },

            10: {
              total: 235.40,
              installment: 23.54
            },

            11: {
              total: 237.61,
              installment: 21.60
            },

            12: {
              total: 239.88,
              installment: 19.99
            }
          }
        },

        trimestral: {
          label: 'Trimestral',

          base: 540.90,

          credit: {
            1: {
              total: 564.61,
              installment: 564.61
            },

            2: {
              total: 575.96,
              installment: 287.98
            },

            3: {
              total: 581.67,
              installment: 193.89
            },

            4: {
              total: 587.35,
              installment: 146.84
            },

            5: {
              total: 593.09,
              installment: 118.62
            },

            6: {
              total: 598.81,
              installment: 99.80
            },

            7: {
              total: 618.81,
              installment: 88.40
            },

            8: {
              total: 624.84,
              installment: 78.11
            },

            9: {
              total: 630.80,
              installment: 70.09
            },

            10: {
              total: 636.76,
              installment: 63.68
            },

            11: {
              total: 642.96,
              installment: 58.45
            },

            12: {
              total: 649.02,
              installment: 54.08
            }
          }
        },

        semestral: {
          label: 'Semestral',

          base: 979.90,

          credit: {
            1: {
              total: 1022.86,
              installment: 1022.86
            },

            2: {
              total: 1043.45,
              installment: 521.73
            },

            3: {
              total: 1053.75,
              installment: 351.25
            },

            4: {
              total: 1063.99,
              installment: 266.00
            },

            5: {
              total: 1074.46,
              installment: 214.89
            },

            6: {
              total: 1084.79,
              installment: 180.80
            },

            7: {
              total: 1121.17,
              installment: 160.16
            },

            8: {
              total: 1131.79,
              installment: 141.47
            },

            9: {
              total: 1142.70,
              installment: 126.97
            },

            10: {
              total: 1153.64,
              installment: 115.36
            },

            11: {
              total: 1164.75,
              installment: 105.89
            },

            12: {
              total: 1175.84,
              installment: 97.99
            }
          }
        },

        anual: {
          label: 'Anual',

          base: 1799.90,

          credit: {
            1: {
              total: 1878.81,
              installment: 1878.81
            },

            2: {
              total: 1916.64,
              installment: 958.32
            },

            3: {
              total: 1935.58,
              installment: 645.19
            },

            4: {
              total: 1954.49,
              installment: 488.62
            },

            5: {
              total: 1973.57,
              installment: 394.71
            },

            6: {
              total: 1992.63,
              installment: 332.10
            },

            7: {
              total: 2059.24,
              installment: 294.18
            },

            8: {
              total: 2078.91,
              installment: 259.86
            },

            9: {
              total: 2098.95,
              installment: 233.22
            },

            10: {
              total: 2119.05,
              installment: 211.91
            },

            11: {
              total: 2139.48,
              installment: 194.50
            },

            12: {
              total: 2159.66,
              installment: 179.97
            }
          }
        }
      }
    },

    /*
     * =========================================================
     * PLANO VIP
     * =========================================================
     */

    vip: {
      label: 'Plano VIP',

      defaultOption: 'mensal',

      optionOrder: [
        'mensal',
        'trimestral',
        'semestral',
        'anual'
      ],

      options: {
        mensal: {
          label: 'Mensal',

          base: 249.90,

          credit: {
            1: {
              total: 260.86,
              installment: 260.86
            },

            2: {
              total: 266.12,
              installment: 133.06
            },

            3: {
              total: 268.74,
              installment: 89.58
            },

            4: {
              total: 271.36,
              installment: 67.84
            },

            5: {
              total: 274.01,
              installment: 54.80
            },

            6: {
              total: 276.68,
              installment: 46.11
            },

            7: {
              total: 285.84,
              installment: 40.83
            },

            8: {
              total: 288.57,
              installment: 36.07
            },

            9: {
              total: 291.36,
              installment: 32.37
            },

            10: {
              total: 294.16,
              installment: 29.42
            },

            11: {
              total: 296.98,
              installment: 27.00
            },

            12: {
              total: 299.85,
              installment: 24.99
            }
          }
        },

        trimestral: {
          label: 'Trimestral',

          base: 674.90,

          credit: {
            1: {
              total: 704.48,
              installment: 704.48
            },

            2: {
              total: 718.65,
              installment: 359.33
            },

            3: {
              total: 725.78,
              installment: 241.93
            },

            4: {
              total: 732.87,
              installment: 183.22
            },

            5: {
              total: 740.00,
              installment: 148.00
            },

            6: {
              total: 747.08,
              installment: 124.51
            },

            7: {
              total: 771.94,
              installment: 110.28
            },

            8: {
              total: 779.54,
              installment: 97.44
            },

            9: {
              total: 787.08,
              installment: 87.45
            },

            10: {
              total: 794.68,
              installment: 79.47
            },

            11: {
              total: 802.23,
              installment: 72.93
            },

            12: {
              total: 809.73,
              installment: 67.48
            }
          }
        },

        semestral: {
          label: 'Semestral',

          base: 1229.90,

          credit: {
            1: {
              total: 1283.82,
              installment: 1283.82
            },

            2: {
              total: 1309.66,
              installment: 654.83
            },

            3: {
              total: 1322.59,
              installment: 440.86
            },

            4: {
              total: 1335.43,
              installment: 333.86
            },

            5: {
              total: 1348.54,
              installment: 269.71
            },

            6: {
              total: 1361.52,
              installment: 226.92
            },

            7: {
              total: 1407.12,
              installment: 201.02
            },

            8: {
              total: 1420.59,
              installment: 177.57
            },

            9: {
              total: 1434.27,
              installment: 159.36
            },

            10: {
              total: 1447.95,
              installment: 144.80
            },

            11: {
              total: 1461.92,
              installment: 132.90
            },

            12: {
              total: 1475.87,
              installment: 122.99
            }
          }
        },

        anual: {
          label: 'Anual',

          base: 2249.00,

          credit: {
            1: {
              total: 2347.60,
              installment: 2347.60
            },

            2: {
              total: 2394.82,
              installment: 1197.41
            },

            3: {
              total: 2418.53,
              installment: 806.18
            },

            4: {
              total: 2442.12,
              installment: 610.53
            },

            5: {
              total: 2466.01,
              installment: 493.20
            },

            6: {
              total: 2489.53,
              installment: 414.92
            },

            7: {
              total: 2572.93,
              installment: 367.56
            },

            8: {
              total: 2597.58,
              installment: 324.70
            },

            9: {
              total: 2622.59,
              installment: 291.40
            },

            10: {
              total: 2647.86,
              installment: 264.79
            },

            11: {
              total: 2673.56,
              installment: 243.05
            },

            12: {
              total: 2698.92,
              installment: 224.91
            }
          }
        }
      }
    },
    /*
     * =========================================================
     * CONSULTA
     *
     * Modalidade única:
     * Consulta nutricional individualizada
     * Valor: R$ 349,90 por sessão
     * =========================================================
     */

    consulta: {
      label: 'Consulta',

      defaultOption: 'consulta',

      optionOrder: [
        'consulta'
      ],

      options: {
        consulta: {
          label: 'Consulta',

          base: 349.90,

          description:
            'consulta nutricional individualizada',

          ctaLabel:
            'AGENDAR CONSULTA →',

          whatsappText:
            'Olá Elias! Tenho interesse na consulta.',

          credit: {
            1: {
              total: 365.23,
              installment: 365.23
            },

            2: {
              total: 372.65,
              installment: 186.33
            },

            3: {
              total: 376.20,
              installment: 125.40
            },

            4: {
              total: 379.84,
              installment: 94.96
            },

            5: {
              total: 383.53,
              installment: 76.71
            },

            6: {
              total: 387.17,
              installment: 64.53
            },

            7: {
              total: 399.98,
              installment: 57.14
            },

            8: {
              total: 403.86,
              installment: 50.48
            },

            9: {
              total: 407.72,
              installment: 45.30
            },

            10: {
              total: 411.61,
              installment: 41.16
            },

            11: {
              total: 415.58,
              installment: 37.78
            },

            12: {
              total: 419.53,
              installment: 34.96
            }
          }
        }
      }
    }
  }
};