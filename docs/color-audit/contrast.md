# Static contrast calculations

Alpha backgrounds are composited over their known parent; intermediate RGB channels stay unrounded. Arrays are resolved [R,G,B,A]. Ratios are rounded for display only. Thresholds apply to the stated text/state; this is not a full conformance audit.

| Pair | Foreground | Background | Ratio | Target | Result |
| --- | --- | --- | ---: | ---: | --- |
| Learning enabled Continue / cards Resources title | `#fff` | `#5ea8ff` | 2.46 | 4.5 | Below target |
| Article next link | `#faf4ea` | `#5ea8ff` | 2.25 | 4.5 | Below target |
| Resources result count | `#5a3a0066` | `#faf4ea` | 2.09 | 4.5 | Below target |
| Learning result count | `#5a3a0066` | `#fdf9ed` | 2.11 | 4.5 | Below target |
| Header muted navigation on canvas | `#737373` | `#faf4ea` | 4.33 | 4.5 | Below target |
| Header muted navigation on learning canvas | `#737373` | `#fdf9ed` | 4.50 | 4.5 | Pass |
| Glossary placeholder | `#005c53a6` | `[225.49019607843138, 229.0980392156863, 219.19607843137254, 1]` | 3.05 | 4.5 | Below target |
| Default body | `#20291b` | `#faf4ea` | 13.76 | 4.5 | Pass |
| Article body | `#4b4b4b` | `#faf4ea` | 7.97 | 4.5 | Pass |
| Brand inverse text | `#faf4ea` | `#005c53` | 7.23 | 4.5 | Pass |
| Clear filters enabled | `#cc3033` | `[252.50980392156862, 225.42745098039217, 220.4470588235294, 1]` | 4.21 | 4.5 | Below target |
| Legacy global focus on canvas | `#1cb0f6` | `#faf4ea` | 2.23 | 3 | Below target |
| Legacy global focus on brand | `#1cb0f6` | `#005c53` | 3.23 | 3 | Pass |
| Selected age border against dialog | `#5ea8ff` | `#fdf9ed` | 2.34 | 3 | Below target |
| Selected age border against selected fill | `#5ea8ff` | `[229.30588235294115, 236.92941176470586, 239.68235294117648, 1]` | 2.08 | 3 | Below target |
| Resource body on #a5d089 | `#20291b` | `#a5d089` | 8.59 | 4.5 | Pass |
| Resource age pill on #a5d089 | `#20291b` | `[140.41176470588235, 177.00392156862745, 116.58431372549019, 1]` | 6.22 | 4.5 | Pass |
| Resource download on #a5d089 | `#fff` | `[99.0, 124.8, 82.2, 1]` | 4.59 | 4.5 | Pass |
| Resource body on #9ccaed | `#20291b` | `#9ccaed` | 8.67 | 4.5 | Pass |
| Resource age pill on #9ccaed | `#20291b` | `[132.75294117647059, 171.89803921568628, 201.68235294117648, 1]` | 6.27 | 4.5 | Pass |
| Resource download on #9ccaed | `#fff` | `[93.6, 121.19999999999999, 142.2, 1]` | 4.56 | 4.5 | Pass |
| Resource body on #dfb6f4 | `#20291b` | `#dfb6f4` | 8.70 | 4.5 | Pass |
| Resource age pill on #dfb6f4 | `#20291b` | `[189.76862745098038, 154.87843137254902, 207.6392156862745, 1]` | 6.29 | 4.5 | Pass |
| Resource download on #dfb6f4 | `#fff` | `[133.79999999999998, 109.2, 146.4, 1]` | 4.54 | 4.5 | Pass |
| Resource body on #c9e7dd | `#20291b` | `#c9e7dd` | 11.44 | 4.5 | Pass |
| Resource age pill on #c9e7dd | `#20291b` | `[171.0470588235294, 196.57647058823528, 188.06666666666666, 1]` | 8.18 | 4.5 | Pass |
| Resource download on #c9e7dd | `#fff` | `[120.6, 138.6, 132.6, 1]` | 3.61 | 4.5 | Below target |
| Resource body on #d3a5a8 | `#20291b` | `#d3a5a8` | 6.97 | 4.5 | Pass |
| Resource age pill on #d3a5a8 | `#20291b` | `[179.55686274509804, 140.41176470588235, 142.96470588235294, 1]` | 5.09 | 4.5 | Pass |
| Resource download on #d3a5a8 | `#fff` | `[126.6, 99.0, 100.8, 1]` | 5.43 | 4.5 | Pass |
| Resource body on #ada3e4 | `#20291b` | `#ada3e4` | 6.55 | 4.5 | Pass |
| Resource age pill on #ada3e4 | `#20291b` | `[147.21960784313725, 138.70980392156864, 194.0235294117647, 1]` | 4.80 | 4.5 | Pass |
| Resource download on #ada3e4 | `#fff` | `[103.8, 97.8, 136.79999999999998, 1]` | 5.70 | 4.5 | Pass |
| Resource body on #d2b9e2 | `#20291b` | `#d2b9e2` | 8.45 | 4.5 | Pass |
| Resource age pill on #d2b9e2 | `#20291b` | `[178.70588235294116, 157.4313725490196, 192.32156862745097, 1]` | 6.11 | 4.5 | Pass |
| Resource download on #d2b9e2 | `#fff` | `[126.0, 111.0, 135.6, 1]` | 4.65 | 4.5 | Pass |
| Resource body on #2d944d | `#20291b` | `#2d944d` | 3.91 | 4.5 | Below target |
| Resource age pill on #2d944d | `#20291b` | `[38.29411764705882, 125.94509803921568, 65.52549019607842, 1]` | 2.97 | 4.5 | Below target |
| Resource download on #2d944d | `#fff` | `[27.0, 88.8, 46.199999999999996, 1]` | 8.37 | 4.5 | Pass |
| Learning variant 2 start on #c9e7dd | `#faf4ea` | `[120.6, 138.6, 132.6, 1]` | 3.30 | 4.5 | Below target |
| Learning variant 2 start on #e8c4ff | `#faf4ea` | `[139.2, 117.6, 153.0, 1]` | 3.74 | 4.5 | Below target |
| Learning variant 2 start on #00cd9c | `#faf4ea` | `[0.0, 123.0, 93.6, 1]` | 4.81 | 4.5 | Pass |
| Learning variant 2 start on #5ea8ff | `#faf4ea` | `[56.4, 100.8, 153.0, 1]` | 5.51 | 4.5 | Pass |
| Learning variant 2 start on #9ccaed | `#faf4ea` | `[93.6, 121.19999999999999, 142.2, 1]` | 4.17 | 4.5 | Below target |
| Learning variant 2 start on #aea3e3 | `#faf4ea` | `[104.39999999999999, 97.8, 136.2, 1]` | 5.20 | 4.5 | Pass |
| Homepage card title #f8ecd7 | `#393939` | `#f8ecd7` | 9.88 | 3 | Pass |
| Homepage revealed action #f8ecd7 | `#393939` | `[222.71372549019608, 211.93725490196078, 193.07843137254903, 1]` | 7.87 | 4.5 | Pass |
| Homepage card title #ff8361 | `#301912` | `#ff8361` | 6.81 | 3 | Pass |
| Homepage revealed action #ff8361 | `#301912` | `[229.0, 117.64313725490196, 87.10980392156863, 1]` | 5.53 | 4.5 | Pass |
| Homepage card title #5ea8ff | `#fff` | `#5ea8ff` | 2.46 | 3 | Below target |
| Homepage revealed action #5ea8ff | `#fff` | `[84.41568627450981, 150.87058823529412, 229.0, 1]` | 3.03 | 4.5 | Below target |
| Homepage card title #dddd62 | `#331a13` | `#dddd62` | 11.24 | 3 | Pass |
| Homepage revealed action #dddd62 | `#331a13` | `[198.46666666666667, 198.46666666666667, 88.00784313725491, 1]` | 9.00 | 4.5 | Pass |
| Homepage card title #a5d089 | `#393939` | `#a5d089` | 6.59 | 3 | Pass |
| Homepage revealed action #a5d089 | `#393939` | `[148.1764705882353, 186.79215686274512, 123.03137254901961, 1]` | 5.30 | 4.5 | Pass |
