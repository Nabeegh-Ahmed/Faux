module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '456ee4dce97f6c21beea9b829e17f578'),
  },
});
