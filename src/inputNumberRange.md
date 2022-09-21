---
title: collapse
---

## 代码演示

<code src="./demos/single.tsx" background="#f5f5f5" height="500px" title="基本用法" />


## API

### TabsProps

| 属性     | 描述         | 类型                    | 默认值 |
| -------- | ------------ | ----------------------- | ------ |
| value   | 数据 | `[string|number|null, string|number|null] | null | undefined`    | `0`    |
| defaultValue   | 默认数据| `[string|number|null, string|number|null] | null | undefined`    | `0`    |
| separator | 分割符号 | `string|React.ReactNode` | `-`    |
| onChange | tab 切换回调 | `(value: string) => {}` | `() => {}`    |
