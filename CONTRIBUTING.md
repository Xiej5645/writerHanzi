# Contribution guide

- Be friendly, and state your contributions: e.g. fixing bug, adding feature
- Note the Github's Code of Conduct should be followed and also included in this repository for reference.

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
