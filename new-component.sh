
mkdir ./src/components/$1
touch ./src/components/$1/$1.jsx
touch ./src/components/$1/$1.scss
echo -e "import React from 'react'; \nimport \"./$1.scss\"; \n\nconst $1 = props => {\n return null;\n} \n\nexport default $1;" >> ./src/components/$1/$1.jsx





