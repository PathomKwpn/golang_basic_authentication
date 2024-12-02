# เลือก Go image ที่รองรับ Go 1.23
FROM golang:1.23 AS build

# ตั้งค่าตัวแปร environment
ENV GO111MODULE=on
WORKDIR /app

# คัดลอก go.mod และ go.sum
COPY go.mod go.sum ./

# ดาวน์โหลด dependencies
RUN go mod tidy

# คัดลอกโค้ดทั้งหมด
COPY . .

# ติดตั้ง Air (และตรวจสอบว่า Air จะอยู่ใน PATH)
RUN go install github.com/air-verse/air@latest && \
    echo "export PATH=$PATH:/root/go/bin" >> /root/.bashrc

# สร้างโปรเจกต์จาก cmd/main.go
RUN go build -o /app/main ./cmd

# เลือก image ที่ใช้สำหรับ run แอป
FROM golang:1.23

WORKDIR /app

# คัดลอกไฟล์จากขั้นตอน build
COPY --from=build /app /app

# ตั้งค่าพาธให้ Air สามารถรันได้
ENV PATH="$PATH:/root/go/bin"

EXPOSE 8080

# รัน Air เพื่อเริ่มแอปในโหมด development
CMD ["air", "-c", ".air.toml"]
