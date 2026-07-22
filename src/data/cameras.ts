import type { CameraBrand, CameraModel } from "./camera-types";

export const CAMERA_BRANDS: CameraBrand[] = [
  {
    id: "canon",
    name: "Canon",
    models: [
      { id: "canon-eos-r5", name: "EOS R5", year: 2020, sensorSize: "Full Frame", megapixels: 45, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-r6-ii", name: "EOS R6 Mark II", year: 2022, sensorSize: "Full Frame", megapixels: 24.2, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-90d", name: "EOS 90D", year: 2019, sensorSize: "APS-C", megapixels: 32.5, mount: "EF", category: "dslr" },
      { id: "canon-eos-r8", name: "EOS R8", year: 2023, sensorSize: "Full Frame", megapixels: 24.2, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-rp", name: "EOS RP", year: 2019, sensorSize: "Full Frame", megapixels: 26.2, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-r10", name: "EOS R10", year: 2022, sensorSize: "APS-C", megapixels: 24.2, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-r50", name: "EOS R50", year: 2023, sensorSize: "APS-C", megapixels: 24.2, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-r100", name: "EOS R100", year: 2023, sensorSize: "APS-C", megapixels: 24.1, mount: "RF", category: "mirrorless" },
      { id: "canon-eos-2000d", name: "EOS 2000D / Rebel T7", year: 2018, sensorSize: "APS-C", megapixels: 24.1, mount: "EF", category: "dslr" },
      { id: "canon-powershot-g7x-iii", name: "PowerShot G7 X Mark III", year: 2019, sensorSize: '1"', megapixels: 20.1, mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "nikon",
    name: "Nikon",
    models: [
      { id: "nikon-z9", name: "Z9", year: 2021, sensorSize: "Full Frame", megapixels: 45.7, mount: "Z", category: "mirrorless" },
      { id: "nikon-z6-iii", name: "Z6 III", year: 2024, sensorSize: "Full Frame", megapixels: 24.5, mount: "Z", category: "mirrorless" },
      { id: "nikon-d850", name: "D850", year: 2017, sensorSize: "Full Frame", megapixels: 45.7, mount: "F", category: "dslr" },
      { id: "nikon-z50", name: "Z50", year: 2019, sensorSize: "APS-C", megapixels: 20.9, mount: "Z", category: "mirrorless" },
      { id: "nikon-z8", name: "Z8", year: 2023, sensorSize: "Full Frame", megapixels: 45.7, mount: "Z", category: "mirrorless" },
      { id: "nikon-zf", name: "Zf", year: 2023, sensorSize: "Full Frame", megapixels: 24.5, mount: "Z", category: "mirrorless" },
      { id: "nikon-z5", name: "Z5", year: 2020, sensorSize: "Full Frame", megapixels: 24.3, mount: "Z", category: "mirrorless" },
      { id: "nikon-z30", name: "Z30", year: 2022, sensorSize: "APS-C", megapixels: 20.9, mount: "Z", category: "mirrorless" },
      { id: "nikon-d3500", name: "D3500", year: 2018, sensorSize: "APS-C", megapixels: 24.2, mount: "F", category: "dslr" },
    ],
  },
  {
    id: "sony",
    name: "Sony",
    models: [
      { id: "sony-a1", name: "Alpha 1", year: 2021, sensorSize: "Full Frame", megapixels: 50.1, mount: "E", category: "mirrorless" },
      { id: "sony-a7-iv", name: "Alpha 7 IV", year: 2021, sensorSize: "Full Frame", megapixels: 33, mount: "E", category: "mirrorless" },
      { id: "sony-a6700", name: "Alpha 6700", year: 2023, sensorSize: "APS-C", megapixels: 26, mount: "E", category: "mirrorless" },
      { id: "sony-a7r-v", name: "Alpha 7R V", year: 2022, sensorSize: "Full Frame", megapixels: 61, mount: "E", category: "mirrorless" },
      { id: "sony-a7c-ii", name: "Alpha 7C II", year: 2023, sensorSize: "Full Frame", megapixels: 33, mount: "E", category: "mirrorless" },
      { id: "sony-a6400", name: "Alpha 6400", year: 2019, sensorSize: "APS-C", megapixels: 24.2, mount: "E", category: "mirrorless" },
      { id: "sony-zv-e10-ii", name: "ZV-E10 II", year: 2024, sensorSize: "APS-C", megapixels: 26, mount: "E", category: "mirrorless" },
      { id: "sony-zv-1", name: "ZV-1", year: 2020, sensorSize: '1"', megapixels: 20.1, mount: "Fixed", category: "compact" },
      { id: "sony-rx100-vii", name: "RX100 VII", year: 2019, sensorSize: '1"', megapixels: 20.1, mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "fujifilm",
    name: "Fujifilm",
    models: [
      { id: "fujifilm-x-t5", name: "X-T5", year: 2022, sensorSize: "APS-C", megapixels: 40.2, mount: "X", category: "mirrorless" },
      { id: "fujifilm-x100vi", name: "X100VI", year: 2024, sensorSize: "APS-C", megapixels: 40.2, mount: "Fixed", category: "compact" },
      { id: "fujifilm-gfx100-ii", name: "GFX100 II", year: 2023, sensorSize: "Medium Format", megapixels: 102, mount: "G", category: "medium-format" },
      { id: "fujifilm-x-pro3", name: "X-Pro3", year: 2019, sensorSize: "APS-C", megapixels: 26.1, mount: "X", category: "mirrorless" },
      { id: "fujifilm-x-s20", name: "X-S20", year: 2023, sensorSize: "APS-C", megapixels: 26.1, mount: "X", category: "mirrorless" },
      { id: "fujifilm-x100v", name: "X100V", year: 2020, sensorSize: "APS-C", megapixels: 26.1, mount: "Fixed", category: "compact" },
      { id: "fujifilm-x-t30-ii", name: "X-T30 II", year: 2021, sensorSize: "APS-C", megapixels: 26.1, mount: "X", category: "mirrorless" },
      { id: "fujifilm-x-e4", name: "X-E4", year: 2021, sensorSize: "APS-C", megapixels: 26.1, mount: "X", category: "mirrorless" },
      { id: "fujifilm-instax-mini-12", name: "Instax Mini 12", year: 2023, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "leica",
    name: "Leica",
    models: [
      { id: "leica-m11", name: "M11", year: 2022, sensorSize: "Full Frame", megapixels: 60, mount: "M", category: "mirrorless" },
      { id: "leica-q3", name: "Q3", year: 2023, sensorSize: "Full Frame", megapixels: 60, mount: "Fixed", category: "compact" },
      { id: "leica-sl3", name: "SL3", year: 2023, sensorSize: "Full Frame", megapixels: 60, mount: "L", category: "mirrorless" },
      { id: "leica-d-lux-8", name: "D-Lux 8", year: 2023, sensorSize: "Micro Four Thirds", megapixels: 17, mount: "Fixed", category: "compact" },
      { id: "leica-m10", name: "M10", year: 2017, sensorSize: "Full Frame", megapixels: 24, mount: "M", category: "mirrorless" },
      { id: "leica-cl", name: "CL", year: 2017, sensorSize: "APS-C", megapixels: 24.2, mount: "L", category: "mirrorless" },
    ],
  },
  {
    id: "panasonic",
    name: "Panasonic (Lumix)",
    models: [
      { id: "panasonic-s5-ii", name: "Lumix S5 II", year: 2023, sensorSize: "Full Frame", megapixels: 24.2, mount: "L", category: "mirrorless" },
      { id: "panasonic-gh6", name: "Lumix GH6", year: 2022, sensorSize: "Micro Four Thirds", megapixels: 25.2, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "panasonic-g9-ii", name: "Lumix G9 II", year: 2023, sensorSize: "Micro Four Thirds", megapixels: 25.2, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "panasonic-lx100-ii", name: "Lumix LX100 II", year: 2018, sensorSize: "Micro Four Thirds", megapixels: 17, mount: "Fixed", category: "compact" },
      { id: "panasonic-s9", name: "Lumix S9", year: 2024, sensorSize: "Full Frame", megapixels: 24.2, mount: "L", category: "mirrorless" },
      { id: "panasonic-gx9", name: "Lumix GX9", year: 2018, sensorSize: "Micro Four Thirds", megapixels: 20.3, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "panasonic-g100", name: "Lumix G100", year: 2020, sensorSize: "Micro Four Thirds", megapixels: 20.3, mount: "Micro Four Thirds", category: "mirrorless" },
    ],
  },
  {
    id: "olympus",
    name: "Olympus / OM System",
    models: [
      { id: "om-system-om-1-ii", name: "OM-1 Mark II", year: 2024, sensorSize: "Micro Four Thirds", megapixels: 20.4, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "olympus-om-d-e-m1-iii", name: "OM-D E-M1 Mark III", year: 2020, sensorSize: "Micro Four Thirds", megapixels: 20.4, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "olympus-pen-f", name: "PEN-F", year: 2016, sensorSize: "Micro Four Thirds", megapixels: 20.3, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "om-system-tg-7", name: "Tough TG-7", year: 2023, sensorSize: '1/2.3"', megapixels: 12, mount: "Fixed", category: "compact" },
      { id: "om-system-om-5", name: "OM-5", year: 2022, sensorSize: "Micro Four Thirds", megapixels: 20.4, mount: "Micro Four Thirds", category: "mirrorless" },
      { id: "olympus-om-d-e-m10-iv", name: "OM-D E-M10 Mark IV", year: 2020, sensorSize: "Micro Four Thirds", megapixels: 20.3, mount: "Micro Four Thirds", category: "mirrorless" },
    ],
  },
  {
    id: "pentax",
    name: "Pentax",
    models: [
      { id: "pentax-k-3-iii", name: "K-3 Mark III", year: 2021, sensorSize: "APS-C", megapixels: 25.7, mount: "K", category: "dslr" },
      { id: "pentax-k-1-ii", name: "K-1 Mark II", year: 2018, sensorSize: "Full Frame", megapixels: 36.4, mount: "K", category: "dslr" },
      { id: "pentax-kp", name: "KP", year: 2017, sensorSize: "APS-C", megapixels: 24.32, mount: "K", category: "dslr" },
      { id: "pentax-645z", name: "645Z", year: 2014, sensorSize: "Medium Format", megapixels: 51.4, mount: "645", category: "medium-format" },
      { id: "pentax-k-70", name: "K-70", year: 2016, sensorSize: "APS-C", megapixels: 24.24, mount: "K", category: "dslr" },
    ],
  },
  {
    id: "hasselblad",
    name: "Hasselblad",
    models: [
      { id: "hasselblad-x2d-100c", name: "X2D 100C", year: 2022, sensorSize: "Medium Format", megapixels: 100, mount: "XCD", category: "medium-format" },
      { id: "hasselblad-907x-100c", name: "907X 100C", year: 2022, sensorSize: "Medium Format", megapixels: 100, mount: "XCD", category: "medium-format" },
      { id: "hasselblad-h6d-100c", name: "H6D-100c", year: 2016, sensorSize: "Medium Format", megapixels: 100, mount: "H", category: "medium-format" },
      { id: "hasselblad-x1d-ii-50c", name: "X1D II 50C", year: 2019, sensorSize: "Medium Format", megapixels: 50, mount: "XCD", category: "medium-format" },
    ],
  },
  {
    id: "sigma",
    name: "Sigma",
    models: [
      { id: "sigma-fp-l", name: "fp L", year: 2021, sensorSize: "Full Frame", megapixels: 61, mount: "L", category: "mirrorless" },
      { id: "sigma-fp", name: "fp", year: 2019, sensorSize: "Full Frame", megapixels: 24.6, mount: "L", category: "mirrorless" },
      { id: "sigma-sd-quattro", name: "sd Quattro", year: 2016, sensorSize: "APS-C", megapixels: 29, mount: "SA", category: "mirrorless" },
      { id: "sigma-dp2-quattro", name: "dp2 Quattro", year: 2014, sensorSize: "APS-C", megapixels: 29, mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "ricoh",
    name: "Ricoh",
    models: [
      { id: "ricoh-gr-iii", name: "GR III", year: 2019, sensorSize: "APS-C", megapixels: 24.2, mount: "Fixed", category: "compact" },
      { id: "ricoh-gr-iiix", name: "GR IIIx", year: 2021, sensorSize: "APS-C", megapixels: 24.2, mount: "Fixed", category: "compact" },
      { id: "ricoh-wg-80", name: "WG-80", year: 2023, sensorSize: '1/2.3"', megapixels: 16, mount: "Fixed", category: "compact" },
      { id: "ricoh-theta-x", name: "Theta X", year: 2022, sensorSize: '1/2"', megapixels: 60, mount: "Fixed", category: "action-cam" },
    ],
  },
  {
    id: "phase-one",
    name: "Phase One",
    models: [
      { id: "phase-one-xf-iq4-150mp", name: "XF IQ4 150MP", year: 2018, sensorSize: "Medium Format", megapixels: 150, mount: "Phase One", category: "medium-format" },
      { id: "phase-one-xt-iq4-150mp", name: "XT IQ4 150MP", year: 2020, sensorSize: "Medium Format", megapixels: 150, mount: "Phase One", category: "medium-format" },
      { id: "phase-one-iq3-100mp", name: "IQ3 100MP", year: 2016, sensorSize: "Medium Format", megapixels: 100, mount: "Phase One", category: "medium-format" },
      { id: "phase-one-iq180", name: "IQ180", year: 2011, sensorSize: "Medium Format", megapixels: 80, mount: "Phase One", category: "medium-format" },
    ],
  },
  {
    id: "dji",
    name: "DJI",
    models: [
      { id: "dji-osmo-pocket-3", name: "Osmo Pocket 3", year: 2023, sensorSize: '1"', megapixels: 9.4, mount: "Fixed", category: "action-cam" },
      { id: "dji-osmo-action-4", name: "Osmo Action 4", year: 2023, sensorSize: '1/1.3"', megapixels: 8, mount: "Fixed", category: "action-cam" },
      { id: "dji-mavic-3", name: "Mavic 3", year: 2021, sensorSize: "Micro Four Thirds", megapixels: 20, mount: "Fixed", category: "drone" },
      { id: "dji-air-3", name: "Air 3", year: 2023, sensorSize: '1/1.3"', megapixels: 48, mount: "Fixed", category: "drone" },
    ],
  },
  {
    id: "gopro",
    name: "GoPro",
    models: [
      { id: "gopro-hero12-black", name: "HERO12 Black", year: 2023, sensorSize: '1/1.9"', megapixels: 27, mount: "Fixed", category: "action-cam" },
      { id: "gopro-hero11-black", name: "HERO11 Black", year: 2022, sensorSize: '1/1.9"', megapixels: 27, mount: "Fixed", category: "action-cam" },
      { id: "gopro-hero10-black", name: "HERO10 Black", year: 2021, sensorSize: '1/2.3"', megapixels: 23, mount: "Fixed", category: "action-cam" },
      { id: "gopro-max", name: "MAX", year: 2019, sensorSize: '1/2.3"', megapixels: 16.6, mount: "Fixed", category: "action-cam" },
    ],
  },
  {
    id: "insta360",
    name: "Insta360",
    models: [
      { id: "insta360-x4", name: "X4", year: 2024, sensorSize: '1/2"', megapixels: 72, mount: "Fixed", category: "action-cam" },
      { id: "insta360-x3", name: "X3", year: 2022, sensorSize: '1/2"', megapixels: 72, mount: "Fixed", category: "action-cam" },
      { id: "insta360-one-rs", name: "ONE RS 1-Inch 360", year: 2022, sensorSize: '1"', megapixels: 21.4, mount: "Fixed", category: "action-cam" },
      { id: "insta360-go-3", name: "GO 3", year: 2023, sensorSize: '1/2.3"', megapixels: 12, mount: "Fixed", category: "action-cam" },
    ],
  },
  {
    id: "polaroid",
    name: "Polaroid",
    models: [
      { id: "polaroid-now-plus", name: "Now+", year: 2022, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
      { id: "polaroid-i-2", name: "I-2", year: 2023, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
      { id: "polaroid-go", name: "Go", year: 2021, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
      { id: "polaroid-onestep-plus", name: "OneStep+", year: 2018, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
      { id: "polaroid-sx-70", name: "SX-70", year: 1972, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
      { id: "polaroid-600", name: "600", year: 1981, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "kodak",
    name: "Kodak",
    models: [
      { id: "kodak-ektar-h35", name: "Ektar H35", year: 2022, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "kodak-m35", name: "M35", year: 2020, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "kodak-pixpro-az421", name: "PIXPRO AZ421", year: 2016, sensorSize: '1/2.3"', megapixels: 20, mount: "Fixed", category: "compact" },
      { id: "kodak-pixpro-fz55", name: "PIXPRO FZ55", year: 2018, sensorSize: '1/2.3"', megapixels: 16, mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "mamiya",
    name: "Mamiya",
    models: [
      { id: "mamiya-rb67-pro-s", name: "RB67 Pro S", year: 1974, sensorSize: "Medium Format", mount: "RB", category: "film" },
      { id: "mamiya-rz67-pro-ii", name: "RZ67 Pro II", year: 1993, sensorSize: "Medium Format", mount: "RZ", category: "film" },
      { id: "mamiya-7-ii", name: "7 II", year: 1999, sensorSize: "Medium Format", mount: "N", category: "film" },
      { id: "mamiya-645-pro-tl", name: "645 Pro TL", year: 1997, sensorSize: "Medium Format", mount: "645", category: "film" },
    ],
  },
  {
    id: "minolta",
    name: "Minolta",
    models: [
      { id: "minolta-x-700", name: "X-700", year: 1981, sensorSize: "35mm Film", mount: "MD", category: "film" },
      { id: "minolta-maxxum-7000", name: "Maxxum 7000", year: 1985, sensorSize: "35mm Film", mount: "A", category: "film" },
      { id: "minolta-maxxum-9", name: "Maxxum 9", year: 1998, sensorSize: "35mm Film", mount: "A", category: "film" },
      { id: "minolta-dimage-7", name: "DiMAGE 7", year: 2001, sensorSize: '1/1.9"', megapixels: 5.2, mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "konica",
    name: "Konica",
    models: [
      { id: "konica-c35", name: "C35", year: 1968, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "konica-hexar-af", name: "Hexar AF", year: 1993, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "konica-fs-1", name: "FS-1", year: 1979, sensorSize: "35mm Film", mount: "AR", category: "film" },
    ],
  },
  {
    id: "contax",
    name: "Contax",
    models: [
      { id: "contax-t2", name: "T2", year: 1990, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "contax-g2", name: "G2", year: 1996, sensorSize: "35mm Film", mount: "G", category: "film" },
      { id: "contax-rts-iii", name: "RTS III", year: 1990, sensorSize: "35mm Film", mount: "C/Y", category: "film" },
    ],
  },
  {
    id: "yashica",
    name: "Yashica",
    models: [
      { id: "yashica-electro-35", name: "Electro 35", year: 1966, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "yashica-mat-124g", name: "Mat-124G", year: 1970, sensorSize: "Medium Format", mount: "Fixed", category: "film" },
      { id: "yashica-t4", name: "T4", year: 1990, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "bronica",
    name: "Bronica",
    models: [
      { id: "bronica-sq-ai", name: "SQ-Ai", year: 1990, sensorSize: "Medium Format", mount: "Bronica SQ", category: "film" },
      { id: "bronica-etrsi", name: "ETRSi", year: 1993, sensorSize: "Medium Format", mount: "Bronica ETR", category: "film" },
      { id: "bronica-gs-1", name: "GS-1", year: 1983, sensorSize: "Medium Format", mount: "Bronica GS", category: "film" },
    ],
  },
  {
    id: "rollei",
    name: "Rollei",
    models: [
      { id: "rollei-rolleiflex-2-8f", name: "Rolleiflex 2.8F", year: 1960, sensorSize: "Medium Format", mount: "Fixed", category: "film" },
      { id: "rollei-35", name: "Rollei 35", year: 1966, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "rollei-sl66", name: "Rolleiflex SL66", year: 1966, sensorSize: "Medium Format", mount: "Rollei Bayonet", category: "film" },
    ],
  },
  {
    id: "voigtlander",
    name: "Voigtländer",
    models: [
      { id: "voigtlander-bessa-r2", name: "Bessa R2", year: 2002, sensorSize: "35mm Film", mount: "VM", category: "film" },
      { id: "voigtlander-bessa-r3a", name: "Bessa R3A", year: 2004, sensorSize: "35mm Film", mount: "VM", category: "film" },
      { id: "voigtlander-vitessa", name: "Vitessa", year: 1950, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "zeiss-ikon",
    name: "Zeiss Ikon",
    models: [
      { id: "zeiss-ikon-zm", name: "ZM", year: 2004, sensorSize: "35mm Film", mount: "ZM", category: "film" },
      { id: "zeiss-ikon-contaflex", name: "Contaflex", year: 1953, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "zeiss-ikon-contessa", name: "Contessa", year: 1950, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "agfa",
    name: "Agfa",
    models: [
      { id: "agfa-clack", name: "Clack", year: 1954, sensorSize: "Medium Format", mount: "Fixed", category: "film" },
      { id: "agfa-optima", name: "Optima", year: 1959, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "agfa-silette", name: "Silette", year: 1953, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "praktica",
    name: "Praktica",
    models: [
      { id: "praktica-mtl5", name: "MTL5", year: 1983, sensorSize: "35mm Film", mount: "M42", category: "film" },
      { id: "praktica-ltl", name: "LTL", year: 1970, sensorSize: "35mm Film", mount: "M42", category: "film" },
      { id: "praktica-bc1", name: "BC1", year: 1980, sensorSize: "35mm Film", mount: "PB", category: "film" },
    ],
  },
  {
    id: "exakta",
    name: "Exakta",
    models: [
      { id: "exakta-varex-iia", name: "Varex IIa", year: 1963, sensorSize: "35mm Film", mount: "Exakta", category: "film" },
      { id: "exakta-500", name: "500", year: 1969, sensorSize: "35mm Film", mount: "Exakta", category: "film" },
    ],
  },
  {
    id: "argus",
    name: "Argus",
    models: [
      { id: "argus-c3", name: "C3", year: 1939, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "argus-a", name: "A", year: 1936, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "kiev",
    name: "Kiev",
    models: [
      { id: "kiev-4", name: "4", year: 1957, sensorSize: "35mm Film", mount: "Contax RF", category: "film" },
      { id: "kiev-60", name: "60", year: 1984, sensorSize: "Medium Format", mount: "Pentacon Six", category: "film" },
    ],
  },
  {
    id: "zorki",
    name: "Zorki",
    models: [
      { id: "zorki-4", name: "4", year: 1956, sensorSize: "35mm Film", mount: "M39", category: "film" },
      { id: "zorki-1", name: "1", year: 1948, sensorSize: "35mm Film", mount: "M39", category: "film" },
    ],
  },
  {
    id: "fed",
    name: "FED",
    models: [
      { id: "fed-2", name: "2", year: 1955, sensorSize: "35mm Film", mount: "M39", category: "film" },
      { id: "fed-5", name: "5", year: 1977, sensorSize: "35mm Film", mount: "M39", category: "film" },
    ],
  },
  {
    id: "lomography",
    name: "Lomography",
    models: [
      { id: "lomography-lca-plus", name: "LC-A+", year: 2006, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "lomography-diana-f-plus", name: "Diana F+", year: 2007, sensorSize: "Medium Format", mount: "Fixed", category: "film" },
      { id: "lomography-holga-120n", name: "Holga 120N", year: 2005, sensorSize: "Medium Format", mount: "Fixed", category: "film" },
      { id: "lomography-lomo-instant-wide", name: "Lomo'Instant Wide", year: 2015, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "petri",
    name: "Petri",
    models: [
      { id: "petri-ft", name: "FT", year: 1968, sensorSize: "35mm Film", mount: "Petri", category: "film" },
      { id: "petri-color-35", name: "Color 35", year: 1968, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "cosina",
    name: "Cosina",
    models: [
      { id: "cosina-ct-1", name: "CT-1", year: 1979, sensorSize: "35mm Film", mount: "M42", category: "film" },
      { id: "cosina-cx-2", name: "CX-2", year: 1980, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "chinon",
    name: "Chinon",
    models: [
      { id: "chinon-ce-4", name: "CE-4", year: 1978, sensorSize: "35mm Film", mount: "K", category: "film" },
      { id: "chinon-bellami", name: "Bellami", year: 1985, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "vivitar",
    name: "Vivitar",
    models: [
      { id: "vivitar-220-sl", name: "220/SL", year: 1974, sensorSize: "35mm Film", mount: "M42", category: "film" },
      { id: "vivitar-ultra-wide-and-slim", name: "Ultra Wide & Slim", year: 1990, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    models: [
      { id: "samsung-nx1", name: "NX1", year: 2014, sensorSize: "APS-C", megapixels: 28, mount: "NX", category: "mirrorless" },
      { id: "samsung-nx300", name: "NX300", year: 2013, sensorSize: "APS-C", megapixels: 20.3, mount: "NX", category: "mirrorless" },
      { id: "samsung-wb350f", name: "WB350F", year: 2014, sensorSize: '1/2.3"', megapixels: 16.3, mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "casio",
    name: "Casio",
    models: [
      { id: "casio-exilim-ex-zr1000", name: "Exilim EX-ZR1000", year: 2012, sensorSize: '1/2.3"', megapixels: 12.1, mount: "Fixed", category: "compact" },
      { id: "casio-qv-10", name: "QV-10", year: 1995, sensorSize: '1/5"', mount: "Fixed", category: "compact" },
    ],
  },
  {
    id: "red",
    name: "RED",
    models: [
      { id: "red-v-raptor-8k-vv", name: "V-Raptor 8K VV", year: 2021, sensorSize: "Full Frame", megapixels: 35.4, mount: "RF", category: "cinema" },
      { id: "red-komodo-6k", name: "Komodo 6K", year: 2020, sensorSize: "Super 35", megapixels: 19.9, mount: "RF", category: "cinema" },
      { id: "red-epic-w-8k", name: "Epic-W 8K", year: 2016, sensorSize: "Full Frame", megapixels: 35.4, mount: "PL", category: "cinema" },
    ],
  },
  {
    id: "arri",
    name: "ARRI",
    models: [
      { id: "arri-alexa-35", name: "Alexa 35", year: 2022, sensorSize: "Super 35", megapixels: 4.6, mount: "PL", category: "cinema" },
      { id: "arri-alexa-mini-lf", name: "Alexa Mini LF", year: 2019, sensorSize: "Full Frame", megapixels: 4.5, mount: "LPL", category: "cinema" },
    ],
  },
  {
    id: "blackmagic-design",
    name: "Blackmagic Design",
    models: [
      { id: "blackmagic-pocket-6k-pro", name: "Pocket Cinema Camera 6K Pro", year: 2021, sensorSize: "Super 35", megapixels: 21.2, mount: "EF", category: "cinema" },
      { id: "blackmagic-ursa-mini-pro-12k", name: "URSA Mini Pro 12K", year: 2020, sensorSize: "Super 35", megapixels: 79.7, mount: "EF", category: "cinema" },
    ],
  },
  {
    id: "linhof",
    name: "Linhof",
    models: [
      { id: "linhof-technika", name: "Master Technika", year: 1936, sensorSize: "Large Format", mount: "Lens board", category: "film" },
    ],
  },
  {
    id: "sinar",
    name: "Sinar",
    models: [
      { id: "sinar-p3", name: "P3", year: 1998, sensorSize: "Large Format", mount: "Lens board", category: "film" },
    ],
  },
  {
    id: "graflex",
    name: "Graflex",
    models: [
      { id: "graflex-speed-graphic", name: "Speed Graphic", year: 1912, sensorSize: "Large Format", mount: "Lens board", category: "film" },
    ],
  },
  {
    id: "mint-camera",
    name: "Mint Camera",
    models: [
      { id: "mint-instantflex-tl70", name: "InstantFlex TL70", year: 2016, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
      { id: "mint-slr670", name: "SLR670", year: 2016, sensorSize: "Instant Film", mount: "Fixed", category: "film" },
    ],
  },
  {
    id: "epson",
    name: "Epson",
    models: [
      { id: "epson-r-d1", name: "R-D1", year: 2004, sensorSize: "APS-C", megapixels: 6.1, mount: "M", category: "mirrorless" },
    ],
  },
  {
    id: "minox",
    name: "Minox",
    models: [
      { id: "minox-b", name: "B", year: 1958, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
      { id: "minox-35-gt", name: "35 GT", year: 1980, sensorSize: "35mm Film", mount: "Fixed", category: "film" },
    ],
  },
];

/** Sentinel model id for "my camera isn't listed" — paired with a free-typed model name. */
export const CUSTOM_MODEL_ID = "custom";

// Saved photos only have a single `camera_model_id` text column, so a custom model's
// free-typed name is encoded into it with this prefix rather than needing a schema change.
const CUSTOM_MODEL_ID_PREFIX = "custom:";

export function encodeCustomModelId(name: string): string {
  return `${CUSTOM_MODEL_ID_PREFIX}${name}`;
}

export function decodeCustomModelName(modelId: string): string | null {
  return modelId.startsWith(CUSTOM_MODEL_ID_PREFIX) ? modelId.slice(CUSTOM_MODEL_ID_PREFIX.length) : null;
}

export const ALL_CAMERA_MODELS: Array<CameraModel & { brandId: string; brandName: string }> =
  CAMERA_BRANDS.flatMap((brand) =>
    brand.models.map((model) => ({ ...model, brandId: brand.id, brandName: brand.name }))
  );

export function getCameraModel(brandId: string, modelId: string) {
  return ALL_CAMERA_MODELS.find((model) => model.brandId === brandId && model.id === modelId);
}

export function formatCameraSpec(model: CameraModel): string {
  const parts: string[] = [model.sensorSize];
  if (model.megapixels) parts.push(`${model.megapixels}MP`);
  return parts.join(" · ");
}
