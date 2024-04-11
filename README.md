## Нэршил

1. folder name - [camelCase]
2. component name - [PascalCase]
<!--  -->
## Асаах заавар

1. Backend хавтаст ".env" файл үүсгэнэ.

2. ".env" файл дотор teams дээрх мэдээллийг оруулж, хадгална.

3. Терминалаа npm i хийнэ. Та терминал хэсгийн зүүн дээд хэсэгт байрлах terminal slip хийх товчлуурыг дарж хувааж болно. Эсвэл доорх гар хослолуудыг ашиглана уу.

Гар хослол:
- терминал хэсэг курсороо байршуулж "command" товчийг "\" товчтой хамт дарж терминалаа /slip/ хуваана.
- windows ээр "ctrl" + "shift" + "5" товчнуудыг зэрэг дарж хуваана.

4. Эхний терминал дээр доорх командуудыг дарааллын дагуу оруулна.

```bash
cd backend
#
npm install
#
npx nodemon index.ts
```
Дээрх командуудыг оруулсны дараа backend [http://localhost:8800] port дээр асна.

frontEnd & adminFrontEnd - ийн instance.ts - рүү орж  baseURL: localBackEnd, болгонов

5. Хоёр дахь терминал дээр доорх командуудыг дарааллын дагуу оруулна.

```bash
cd frontend
#
npm install
#
npm run dev
```

Дээрх командуудыг оруулсны дараа backend [http://localhost:3000] port дээр асна.

