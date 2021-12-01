
#WORKDIR /tmp

#ADD oracle-instantclient*.rpm /tmp/

#USER root


# install dev tools 

#RUN yum-config-manager --enable rhel-server-rhscl-7-rpms && \
#    yum-config-manager --enable rhel-7-server-rpms && \
#	yum-config-manager --enable rhel-7-server-eus-rpms && \
#    yum-config-manager --enable rhel-7-server-optional-rpms && \	
#    yum -y groupinstall 'Development Tools' && \
#    yum clean all
	
#RUN yum-config-manager --enable rhel-server-rhscl-7-rpms && \
#    yum-config-manager --enable rhel-7-server-rpms && \
#	yum-config-manager --enable rhel-7-server-eus-rpms && \
#    yum-config-manager --enable rhel-7-server-optional-rpms && \	
#	INSTALL_PKGS="wget libaio-devel" && \
#    yum -y --setopt=tsflags=nodocs install $INSTALL_PKGS && \
#    rpm -V $INSTALL_PKGS && \
#    yum clean all




# set the oracle library path
#ENV LD_LIBRARY_PATH /usr/lib/oracle/12.2/client64/lib:${LD_LIBRARY_PATH}

# Update Oracle Linux
# Install Node.js
# Install the Oracle Instant Client
# Check that Node.js and NPM installed correctly
# Install the OracleDB driver





FROM node:10

#RUN adduser node root

# Create app directory
# WORKDIR /usr/src/
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json ./
ADD package.json /app/
ADD index.js /app/

# If you are building your code for production
# RUN npm ci --only=production


RUN chmod -R 777 /app
RUN chown -R node:node /app

RUN export NLS_LANG=.WE8MSWIN1252
RUN export NLS_DATE_FORMAT='DD/MM/YYYY'

#RUN chmod -R 777 /app/err.log
#RUN chown -R /app/err.log

COPY . /app
RUN npm install --production --no-optional

EXPOSE 8080

CMD ["sqlplus", "-v"]

#CMD [ "node", "/app/index.js",  "imb" ]
#CMD node index.js imb 