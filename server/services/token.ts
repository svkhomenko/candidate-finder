import jwt from 'jsonwebtoken';

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

type ConfirmPayload = {
  id: number;
  email?: string;
};

type Options = {
  expiresIn?: string;
};

const Token = {
  generate(payload: ConfirmPayload, options: Options = {}) {
    const expiresIn = options.expiresIn || TOKEN_EXPIRES_IN;

    return jwt.sign(payload, TOKEN_SECRET as string, { expiresIn });
  },

  validate(token?: string) {
    try {
      return jwt.verify(token || '', TOKEN_SECRET as string);
    } catch (_err) {
      return null;
    }
  },

  generateConfirmToken(payload: ConfirmPayload) {
    return Token.generate(payload, { expiresIn: '1h' });
  },

  generateUserTokens({ id, email }: ConfirmPayload) {
    const accessToken = Token.generate({ id, email });
    const refreshToken = Token.generate({ id }, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  },
};
export default Token;
