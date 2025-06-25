FROM ubuntu:22.04
RUN rm /bin/sh && ln -s /bin/bash /bin/sh


# Install base packages
RUN apt-get update
RUN apt-get install sudo
RUN apt-get install nano
RUN apt-get install -y curl

# Install nvm, node && npm
    # nvm environment variables
ENV NVM_DIR="/usr/local/nvm"
ENV NODE_VERSION="22"
    # install nvm
        # https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
RUN apt install npm -y

WORKDIR /usr/src/app

EXPOSE 5173

COPY startup.sh /
RUN chmod +x /startup.sh
CMD ["sh", "/startup.sh"]