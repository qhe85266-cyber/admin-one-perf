# Admin One Perf · Qi

## 中文

这是 Qi 的 GitHub 作品集项目：基于 [JustBoil Admin One React Tailwind](https://github.com/justboil/admin-one-react-tailwind) 的 MIT 开源管理后台性能优化分支，使用 Next.js、React、TypeScript 和 Tailwind CSS。

### 本地运行

需要 Node.js `^20.19.0 || >=22.12.0`。

```sh
npm ci
npm run dev
```

打开 http://localhost:3000/admin-one-react-tailwind 。生产构建与运行：

```sh
npm ci && npm run build
npm start
```

保留原有 basePath `/admin-one-react-tailwind` 和所有路由。登录页位于 `/admin-one-react-tailwind/login`；任意凭据均可，点击 Login 或 Home 即可进入后台，无需账号。

### Qi 的改动

- 图表区域进入视口后，通过 IntersectionObserver 和 `next/dynamic` 加载 ChartLineSample、Chart.js 与 react-chartjs-2；加载前显示固定 `h-96` 骨架，保留刷新按钮与卸载清理。
- NumberDynamic 使用 requestAnimationFrame 和正确的 `[value, duration]` 依赖；值不变时不重启动画，卸载或依赖变化时取消动画，支持数值增减。
- DiceBear 头像替换为本地彩色首字母头像，移除 Google Analytics 脚本。
- 登录页增加免账号演示提示；移除登录表单凭据的控制台输出。
- 保留 MIT LICENSE、JustBoil 署名及原有 basePath。

### 性能结果

| 指标 | 优化前（提供的基线） | 优化后（本次生产构建） |
| --- | --- | --- |
| Dashboard First Load JS | 约 181 kB | 120 kB（约减少 34%） |
| 图表代码 | 约 65 KiB gzip，首屏同步加载 | 独立异步 chunk，进入视口才加载 |
| Dashboard 自动请求的外部第三方域名 | 2（DiceBear、GA） | 0 |
| NumberDynamic effect | 无依赖数组，每次渲染重跑 | `[value, duration]`，帧动画可取消 |

结果来自 `npm run build`（Next.js 15.5.6）；Dashboard 路由 Size 为 6.51 kB，所有路由共享 First Load JS 为 102 kB。First Load JS 是构建报告指标，并非实测首屏耗时。进入图表区域后仍需下载图表代码。

域名统计针对默认后台的自动网络请求，不包括用户点击的外部链接、社交分享元数据，以及 responsive / 样式选择页面保留的 `static.justboil.me` 图片；相应 images remotePatterns 配置保留。

### 许可证与致谢

上游：[justboil/admin-one-react-tailwind](https://github.com/justboil/admin-one-react-tailwind)。继续使用 MIT 许可证；[LICENSE](LICENSE) 中的 JustBoil 版权声明原样保留。

## English

Qi’s portfolio fork of the MIT-licensed [JustBoil Admin One React Tailwind dashboard](https://github.com/justboil/admin-one-react-tailwind), focused on performance and an accessible account-free demo.

### Run locally

Requires Node.js `^20.19.0 || >=22.12.0`.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000/admin-one-react-tailwind . To build and serve production:

```sh
npm ci && npm run build
npm start
```

The original `/admin-one-react-tailwind` basePath and routes are retained. Visit `/admin-one-react-tailwind/login`; any credentials work. Click Login or Home to enter without an account.

### Qi’s changes

- Load ChartLineSample, Chart.js, and react-chartjs-2 through IntersectionObserver and `next/dynamic` only when the chart section enters the viewport. A fixed `h-96` skeleton reserves space; reload still generates fresh data, and the observer is cleaned up.
- Replace NumberDynamic’s effect without dependencies with a cancellable requestAnimationFrame animation using `[value, duration]`. Unchanged values do not restart it; decreasing values work too.
- Replace DiceBear requests with local colored initials and remove both Google Analytics scripts.
- Add a visible demo notice and remove credential logging from the login form.
- Preserve the MIT license, upstream credit, and existing basePath.

### Performance

| Metric | Before (supplied baseline) | After (production build) |
| --- | --- | --- |
| Dashboard First Load JS | ~181 kB | 120 kB (~34% reduction) |
| Chart code | ~65 KiB gzip loaded eagerly | Separate async chunk loaded on viewport entry |
| Automatic external third-party domains on dashboard | 2 (DiceBear + GA) | 0 |
| NumberDynamic effect | No dependency array | `[value, duration]` with frame cleanup |

Measured with `npm run build`, Next.js 15.5.6. Dashboard route Size: 6.51 kB; shared First Load JS: 102 kB. First Load JS is a build-report metric, not a measured paint time. Chart code is still downloaded when the section becomes visible.

The domain count covers automatic requests on the default dashboard. It excludes outbound links, social metadata, and existing `static.justboil.me` images on responsive/style-selection pages; the image remotePatterns configuration remains available.

### License and credit

Upstream: [justboil/admin-one-react-tailwind](https://github.com/justboil/admin-one-react-tailwind). This fork remains MIT licensed. JustBoil’s copyright notice is retained unchanged in [LICENSE](LICENSE).
