FROM php:7.3-apache

MAINTAINER "Carlos H Brandt <chbrandt@github>"

ENV HTDOCS=/var/www/html

ENV APACHE_RUN_USER=www-data \
    APACHE_RUN_GROUP=www-data

RUN a2enmod rewrite

COPY apache-config.conf /etc/apache2/sites-enabled/000-default.conf

COPY apaxy/ $HTDOCS

RUN cd ${HTDOCS}                                            && \
    rm -f index.html                                        && \
    sed -i "s:/{FOLDERNAME}::g" htaccess.txt                && \
    sed -i "s:/{FOLDERNAME}::g" theme/htaccess.txt          && \
    grep -l "{FOLDERNAME}" theme/*.html | xargs -L1 -I {}   \
        sed -i "s:/{FOLDERNAME}::g" {}                      && \
    mv htaccess.txt .htaccess                               && \
    mv theme/htaccess.txt theme/.htaccess

EXPOSE 80

CMD /usr/sbin/apache2ctl -D FOREGROUND
