import { z } from 'zod';

// Auth validation schemas
export const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(6, '密码至少6位'),
});

export const registerSchema = z
  .object({
    username: z.string().min(3, '用户名至少3位').max(20, '用户名最多20位'),
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码至少6位'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

// Profile validation schemas
export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, '用户名至少3位')
    .max(20, '用户名最多20位')
    .optional(),
  nickname: z
    .string()
    .min(1, '昵称不能为空')
    .max(50, '昵称最多50位')
    .optional(),
  email: z.string().email('请输入有效的邮箱地址').optional(),
  emailVerificationCode: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '请输入当前密码'),
    newPassword: z.string().min(6, '新密码至少6位'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

// Task validation schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, '任务标题不能为空').max(100, '任务标题最多100字'),
  description: z
    .string()
    .min(1, '任务描述不能为空')
    .max(1000, '任务描述最多1000字'),
  points: z
    .number()
    .min(1, '积分奖励至少1分')
    .max(10000, '积分奖励最多10000分'),
});

export const submitTaskSchema = z.object({
  submissionContent: z
    .string()
    .min(1, '提交内容不能为空')
    .max(2000, '提交内容最多2000字'),
  attachments: z.array(z.string()).optional(),
});

// Chat validation schemas
export const chatMessageSchema = z.object({
  message: z.string().min(1, '消息不能为空').max(1000, '消息最多1000字'),
  sessionId: z.string().optional(),
});

// Reset password validation schemas
export const resetPasswordRequestSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
});

export const resetPasswordConfirmSchema = z
  .object({
    email: z.string().email('请输入有效的邮箱地址'),
    verificationCode: z.string().min(6, '验证码为6位数字'),
    newPassword: z.string().min(6, '新密码至少6位'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

// Task filter validation schemas
export const taskFiltersSchema = z.object({
  status: z
    .enum(['AVAILABLE', 'ASSIGNED', 'SUBMITTED', 'COMPLETED', 'CLOSED'])
    .optional(),
  type: z.string().optional(),
  minReward: z.number().min(0).optional(),
  maxReward: z.number().min(0).optional(),
});

// Pagination validation schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Email verification schema
export const emailVerificationSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  code: z.string().min(6, '验证码为6位数字').max(6, '验证码为6位数字'),
});

// Search schema
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, '搜索关键词不能为空')
    .max(100, '搜索关键词最多100字'),
  type: z.enum(['tasks', 'users', 'all']).default('all'),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().default(5 * 1024 * 1024), // 5MB default
  allowedTypes: z
    .array(z.string())
    .default(['image/jpeg', 'image/png', 'image/gif']),
});

// Custom validation functions
export const validatePassword = (password: string) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`密码至少需要${minLength}位`);
  }
  if (!hasLowerCase) {
    errors.push('密码需要包含小写字母');
  }
  if (!hasUpperCase) {
    errors.push('密码需要包含大写字母');
  }
  if (!hasNumbers) {
    errors.push('密码需要包含数字');
  }
  if (!hasSpecialChar) {
    errors.push('密码需要包含特殊字符');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar].filter(
      Boolean
    ).length,
  };
};

export const validateUsername = (username: string) => {
  const minLength = 3;
  const maxLength = 20;
  const validPattern = /^[a-zA-Z0-9_]+$/;

  const errors: string[] = [];

  if (username.length < minLength) {
    errors.push(`用户名至少需要${minLength}位`);
  }
  if (username.length > maxLength) {
    errors.push(`用户名最多${maxLength}位`);
  }
  if (!validPattern.test(username)) {
    errors.push('用户名只能包含字母、数字和下划线');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type SubmitTaskFormData = z.infer<typeof submitTaskSchema>;
export type ChatMessageFormData = z.infer<typeof chatMessageSchema>;
export type ResetPasswordRequestFormData = z.infer<
  typeof resetPasswordRequestSchema
>;
export type ResetPasswordConfirmFormData = z.infer<
  typeof resetPasswordConfirmSchema
>;
export type TaskFiltersFormData = z.infer<typeof taskFiltersSchema>;
export type PaginationFormData = z.infer<typeof paginationSchema>;
export type EmailVerificationFormData = z.infer<typeof emailVerificationSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
