# 项目日志

## 进程记录

1. 讨论项目选题 20240515

2. 分工确定任务 20240520

3. 基本完成分块组件设计 v1.0 20240604

4. 组合全部组件 v2.0 20240611

5. 总结项目 20240622

## 代码规范

### 命名规范

- 变量、属性、参数：下划线命名 user_name
- 函数：小驼峰命名 username
- 类名、类型：大驼峰命名 UserName
- 文件、文件夹：中划线命名 user-name

### Git提交规范

#### 代码类

- feat：添加新功能
- fix：修复bug

- refactor：**重构**代码
- perf：性能提高

#### 非代码类

- docs：**文档**修改

- style：**样式**修改
- build：工具包或者外部依赖的改动，如gulp,npm等进行的改动
- chore：其他不针对src或者test部分，以外的修改，例如构建过程或辅助工具的变动

#### 其它

- test：添加缺失的测试或者修改现有测试
- ci：CI（持续集成服务）的配置文件和脚本的更改
- revert：执行git revert打印的message，恢复上一次提交。

### Prettier

规范代码格式

1. 文件： .prettierrc,  .prettierigonre

2. jsconfig.json中添加 ：

```
"scripts": 
{
    "_comments": "prettier 配置文件",
    "format": "prettier --write \"src/**/*.{js,vue,css,scss,html,json,md}\"" 
},
```

3. 运行npm run format
