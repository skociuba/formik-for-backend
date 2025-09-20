Logując się na serwer komendą ssh root@85.215.128.5

rm -rf /var/www/frontend → usuwa tylko folder z frontendem.
rm -rf /var/www/backend → usuwa tylko folder z backendem.

Wchodzę do bazy - sudo mysql -u root
DROP DATABASE laravel_db; usuwam bazę
EXIT - wychodze z bazy

Instalka node i git

sudo apt update
sudo apt install -y nodejs npm git

PM2 (aby procesy działały po wylogowaniu)

sudo npm install -g pm2

tworzę foldery fe i be

sudo mkdir -p /var/www/frontend
sudo mkdir -p /var/www/backend
ls -l /var/www

Klonowanie repo

cd /var/www/frontend
git clone git@github.com:skociuba/formik-for-backend.git

cd /var/www/backend
git clone git@github.com:skociuba/laravel-boilerplate.git

PHP i Composer

sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.2 php8.2-cli php8.2-fpm php8.2-mysql php8.2-mbstring php8.2-xml php8.2-bcmath unzip curl composer

Instalacja zależności Laravel

cd /var/www/backend/laravel-boilerplate
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate

Problem z wersjami PHP

cd /var/www/backend/laravel-boilerplate
composer update --no-dev --optimize-autoloader

cp .env.example .env
php artisan key:generate

Instalacja MySQL

sudo apt update
sudo apt install mysql-server -y
sudo mysql_secure_installation

na pytania odpowiadam

Validate password: N (lub Y jeśli chcesz silne hasła)

Remove anonymous users: Y

Disallow root login remotely: Y

Remove test database: Y

Reload privileges: Y

Tworzenie bazy i użytkownika:
sudo mysql -u root - wchodzę jako rot user
CREATE DATABASE laravel_db;
CREATE USER 'laravel_user'@'localhost' IDENTIFIED BY 'haslo123';
GRANT ALL PRIVILEGES ON laravel_db.\* TO 'laravel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
Konfiguracja .env w Laravel:
nano .env na be i uzupełniam
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=haslo123
Migracje i cache Laravel
php artisan migrate
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache

odpalenie bez pm2
php artisan serve --host=85.215.128.5 --port=8000

Użycie pm2
zastopowanie starych pm2
pm2 stop all
pm2 delete all
pm2 save
odpalenie pm2
pm2 start "php artisan serve --host=0.0.0.0 --port=8000" --name laravel-be
zasejwowanie - potwierdź
pm2 save
pm2 startup

FE
cd /var/www/frontend/formik-for-backend
npm install
nano .env sprawdzenie czy mamy zmienną (mamy , dziwne sprawdź )
npm run build
PORT=3000 pm2 start npm --name "nextjs-app" -- start -- -H 0.0.0.0 -p 3000
zasejwowanie - potwierdź
pm2 save
pm2 startup

na be wcześniej twożyłem config/cors.php teraz na serwerze nie było z tym problemu

<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',  // lokalny FE
        'http://85.215.128.5:3000', // serwerowy FE
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];

podpięcie dbbeaver

1️⃣ Zezwolenie MySQL na połączenia zdalne
Zaloguj się do MySQL na serwerze:


sudo mysql -u root

Stwórz użytkownika z dostępem z dowolnego hosta (%) lub tylko z Twojego IP:


CREATE USER 'laravel_user'@'%' IDENTIFIED BY 'haslo123';
GRANT ALL PRIVILEGES ON laravel_db.* TO 'laravel_user'@'%';
FLUSH PRIVILEGES;
EXIT;

% oznacza, że użytkownik może łączyć się z dowolnego adresu. Jeśli chcesz ograniczyć do Twojego komputera, zastąp % swoim IP np. 192.168.1.10.

2️⃣ Zezwolenie na połączenia TCP w MySQL
Edytuj plik konfiguracyjny MySQL:
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

Znajdź linię:
bind-address = 127.0.0.1

i zmień ją na:
bind-address = 0.0.0.0

To pozwoli MySQL słuchać na wszystkich interfejsach sieciowych.
Zrestartuj MySQL:
sudo systemctl restart mysql


3️⃣ Otwórz port 3306 w firewall - NIE MAM TAKIEGO
Jeśli używasz UFW:
sudo ufw allow 3306/tcp
sudo ufw reload

Jeśli UFW jest wyłączony (Status: inactive), możesz go włączyć:
sudo ufw enable


4️⃣ Sprawdzenie połączenia zdalnego
Na swoim lokalnym komputerze (tam, gdzie masz DBeaver):
mysql -u laravel_user -p -h 85.215.128.5 -P 3306  MUSISZ 

5️⃣ Konfiguracja DBeaver
Nowe połączenie → MySQL


Host: 85.215.128.5


Port: 3306


Database: laravel_db


Username: laravel_user


Password: haslo123


Testuj połączenie → powinno przejść.









1️⃣ Instalacja Nginx
sudo apt update
sudo apt install nginx -y

Sprawdź status:
systemctl status nginx


2️⃣ PHP-FPM
Masz PHP-FPM 8.2, sprawdź status:
systemctl status php8.2-fpm

Jeśli nie działa:
sudo systemctl enable php8.2-fpm
sudo systemctl start php8.2-fpm


3️⃣ Konfiguracja serwera Nginx
Plik: /etc/nginx/sites-available/project
server {
    listen 80;
    server_name 85.215.128.5;

    # Frontend (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;   # Next.js działa na PM2 na porcie 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend (Laravel)
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/; # Laravel działa na PM2 na porcie 8000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

Uwagi:
proxy_pass dla backendu /api/ kończy się /api/, żeby zachować poprawne ścieżki.


Next.js działa pod 127.0.0.1:3000 na PM2 – nie trzeba uruchamiać na 0.0.0.0, jeśli Nginx robi proxy.


Backend na PM2 działa pod 127.0.0.1:8000.



4️⃣ Aktywacja konfiguracji
sudo ln -s /etc/nginx/sites-available/project /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t           # test konfiguracji
sudo systemctl reload nginx


5️⃣ Uprawnienia Laravel
sudo chown -R www-data:www-data /var/www/backend/laravel-boilerplate
sudo chmod -R 775 /var/www/backend/laravel-boilerplate/storage
sudo chmod -R 775 /var/www/backend/laravel-boilerplate/bootstrap/cache


6️⃣ Po zapisaniu konfiguracji
sudo nginx -t
sudo systemctl restart nginx


7️⃣ Frontend .env
Skoro Nginx robi proxy:
NEXT_PUBLIC_API_URL=http://85.215.128.5/api

Zbuduj frontend i restart PM2:


cd /var/www/frontend/formik-for-backend
npm run build
pm2 restart nextjs-app
