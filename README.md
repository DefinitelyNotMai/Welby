# Web Application for Welby

## Working on the Repository:

### Branches

- `backend` - changes only in WelbyBackend directory.
- `frontend` - changes for all ".tsx" and some ".ts" files if it is for styling.
- `api/config` - changes that will solely be in frontend/src/api/.

## Workflow

### Branching

- All branches should be based off the `main` branch.

### Example Workflow for Frontend changes:

- If making changes in the frontend, create a new branch names `frontend-test` based on `main`.
- Merge changes from the `frontend` branch into `frontend-test`.
- Test thoroughly, and if everything is working, merge `frontend-test` into `main`.
- Delete the `frontend-test` branch.

### Updating Other Branches:

- After updating the `main` branch, merge these changes into the other branches.
- Since each branch is specific to certain files, conflicts are minimized, and merging should be smooth.

---

### Pull Requests (Optional)

- If preferred, create a Pull Request when merging changes into `main` or other branches.
- This allows for a review of the changes before merging.

---

### Keeping the Repository Up to Date

- Regularly update your branches with changes from the `main` branch to ensure that your work is based on the latest code.

---

### NOTE:

- If two people are working on the same branch, do communicate with each other on which files you're working on, so when one pushes first, the other can easily pull and push their changes without conflicts.
- Feel free to add branches if needed for separation of concerns or other stuff.
