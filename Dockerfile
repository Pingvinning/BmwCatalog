    #FROM eclipse-temurin:21-jdk AS build
    #WORKDIR /app
    #COPY . .
    #RUN chmod +x mvnw
    #RUN ./mvnw clean package -DskipTests -Dmaven.compiler.fork=true
    #
    #FROM eclipse-temurin:21-jdk
    #WORKDIR /app
    #COPY --from=build /app/target/*.jar app.jar
    #ENTRYPOINT ["java", "-jar", "app.jar"]


    #FROM openjdk:21 AS build
    #WORKDIR /app
    #COPY --from=build /app/target/*.jar app.jar
    #ENTRYPOINT ["java", "-jar", "app.jar"]
    #EXPOSE 8080L


FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:21
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
