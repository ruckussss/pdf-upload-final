import pika
import requests
import os
import json

# Connect to RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='pdf_queue', durable=True)

def download_pdf(url, file_path):
    try:
        response = requests.get(url)
        response.raise_for_status()
        with open(file_path, 'wb') as f:
            f.write(response.content)
    except Exception as e:
        print(f"Error downloading file from URL {url}: {e}")
        raise

def process_pdf(file_path):
    # Implement your PDF processing logic here
    print(f"Processing PDF: {file_path}")

def callback(ch, method, properties, body):
    try:
        message = json.loads(body)
        pdf_url = message['url']
        file_path = '/tmp/temporary.pdf'

        print(f"Received message: {message}")

        try:
            # Download the PDF
            download_pdf(pdf_url, file_path)

            # Process the PDF
            process_pdf(file_path)

            # Acknowledge message
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(f"Error processing PDF: {e}")
            ch.basic_nack(delivery_tag=method.delivery_tag)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print(f"Unexpected error: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag)

channel.basic_consume(queue='pdf_queue', on_message_callback=callback, auto_ack=False)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
