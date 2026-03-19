import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message:
    "Diga não ao DoS/DDoS | Você foi hackeado por N3utr0n do F.H.C (FR13NDs Hackers Club).",
});

export default limiter;
