# writerHanzi

Built with **ReactJS + Vite** aimed at helping students practice writing Chinese (traditional and simplified) using the proper stroke order. 

While I studied Chinese, stroke order was hard to remember and only few resources online to practice writing Chinese characters. Most apps that do provide stroke order practice feature were limited or paid, thus I started this side project as a computer science student. 

Open to collaborations and contributions. Thank you for visiting this repo.   
Have ideas for how writerHanzi can be improved? Feel free to open an issue or a pull request!

## Demo and deployment
Project is deployed! (last check March 12, 2025)
Visit [https://tiny.cc/chwrite](https://tiny.cc/chwrite)
> [!NOTE]  
> Use shorten link provided above, the direct link may be changed in the future.  

## Making changes or Contribution

<details open><summary>Getting started</summary>

> To use `npm` you have to download and install Node.js from [Node.js official website](https://nodejs.org/) if you don't already have it installed.
>
>Direct link, choose your custom version and OS: [https://nodejs.org/en/download](https://nodejs.org/en/download)
> 
>Video demo for Windows: [https://www.youtube.com/watch?v=kQabFyl9r9I](https://www.youtube.com/watch?v=kQabFyl9r9I)
> 
>Extra resource: [https://www.geeksforgeeks.org/install-node-js-on-windows/](https://www.geeksforgeeks.org/install-node-js-on-windows/)

1. Clone the repository to local machine
    ```bash
    git clone https://github.com/Xiej5645/writerHanzi.git
    ```

2. Navigate to project director
    ```bash
    cd writerHanzi
    ```

3. Install dependencies & Run app locally
    ```bash
    npm install
    npm run dev 
    ```
Now you have the project running, you can edit the local project files and see the changes. 
Have fun. 

</details>
<details open><summary>Contribution Guide</summary>

- Be friendly, and state your contributions: e.g. fixing bug, adding feature

- Beginner guide: 
  - Fork repo, so you get your own copy of the project files 
  - Clone the forked repo/your copy to local machine 
  - Make a new branch
      ```bash
      git checkout -b <branch-name>
      ```
  - Keep your fork in sync
      ```bash
      git remote add upstream https://github.com/<your-username>/repo-name.git
      git fetch upstream
      git pull upstream main
      git push
      ```
  - When you're ready, make a PR (pull request) request
    >* Github may have a message prompting you to create a pull request. Click on "Compare & pull request".
    >* On the create PR page, state your edits and explain why you made the changes. 
    >* Any issue/PR request for this repo be reviewed on a bi-weekly basis (may vary due to my school schedule)

</details>


## Acknowledgement and Credits
- [https://github.com/chanind/hanzi-writer](https://github.com/chanind/hanzi-writer) (MIT License)
- [https://github.com/Kaifuny/pinyin4js](https://github.com/Kaifuny/pinyin4js) (MIT License)
- [https://github.com/hermanschaaf/chinese-ime](https://github.com/hermanschaaf/chinese-ime) (GNU Lesser General Public License v3.0)
- [https://codepen.io/erikterwan/pen/EVzeRP](https://codepen.io/erikterwan/pen/EVzeRP) (MIT License) Inspired menu icon


## Additional Updates
- 2025-01-15
  - added additional option of url param 't' for querying raw Chinese character Terms.  
  for example: ?t=我
