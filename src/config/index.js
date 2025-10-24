const conf = {
  apiBaseUrl: import.meta.env.VITE_ADMIN_BASE_URL,
  resetPasswordUrl: `${import.meta.env.VITE_ADMIN_BASE_URL}/admin/reset-password`,
};

export default conf;
