FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go install github.com/air-verse/air@latest

RUN go build -o ./tmp/main.exe ./cmd

FROM golang:1.24

WORKDIR /app

COPY --from=builder /app /app

COPY --from=builder /go/bin/air /usr/local/bin/air

ENV PATH="/usr/local/bin:${PATH}"

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]
