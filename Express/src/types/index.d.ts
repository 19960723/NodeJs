// types/user.ts
export interface UpdateUserInput {
  id: number; // 必填，用于定位用户
  username?: string; // 可选，用户名
  phone?: string; // 可选，手机号
  email?: string; // 可选，邮箱
  password?: string; // 可选，新密码
  avatar?: string; // 可选，头像
  nickname?: string; // 可选，昵称
}
