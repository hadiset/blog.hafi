---
title: "Cara Mencetak Hello World dengan JavaScript"
author: "Hafi"
publish_date: 2024-09-11
category: "JavaScript"
tags: ["javascript", "tutorial", "beginner", "console"]
description: "Tutorial sederhana untuk mencetak Hello World menggunakan console.log() dalam JavaScript. Perfect untuk pemula yang baru belajar programming."
image: "/images/hello-world-js.jpg"
imageAlt: "JavaScript Hello World tutorial"
draft: false
featured: true
---

Selamat datang di tutorial JavaScript! Kali ini kita akan belajar cara paling dasar dalam programming: mencetak "Hello World" ke console.

## Apa itu console.log()?

`console.log()` adalah method JavaScript yang digunakan untuk menampilkan output ke browser console. Ini sangat berguna untuk debugging dan melihat nilai variabel.

## Cara Menggunakan console.log()

### 1. Syntax Dasar

```javascript
console.log("Hello World");
```

### 2. Dengan Variabel

```javascript
const message = "Hello World";
console.log(message);
```

### 3. Multiple Values

```javascript
const name = "Hafi";
const greeting = "Hello";
console.log(greeting, name, "!");
// Output: Hello Hafi !
```

## Variasi Lainnya

### String Template

```javascript
const name = "World";
console.log(`Hello ${name}!`);
```

### Dengan Emoji

```javascript
console.log("👋 Hello World! 🌍");
```

## Cara Melihat Output

1. **Browser DevTools**: Tekan `F12` → tab Console
2. **Node.js**: Jalankan di terminal dengan `node filename.js`
3. **Online Editor**: CodePen, JSFiddle, dll

## Tips untuk Pemula

- Gunakan console.log() untuk debugging
- Jangan lupa tanda kutip untuk string
- Semicolon (`;`) opsional tapi good practice
- Console bisa menampilkan objects, arrays, dll

## Kesimpulan

`console.log()` adalah langkah pertama dalam journey programming JavaScript. Simple tapi powerful untuk learning dan debugging!

Selamat coding! 🚀