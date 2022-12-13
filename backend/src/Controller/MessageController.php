<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Chat;
use App\Entity\Message;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use App\Service\CookieHelper;
use Doctrine\Persistence\ManagerRegistry;

class MessageController extends AbstractController
{
    #[Route('/message/{user}', name: 'message_user', methods: 'POST')]
    public function messageUser(
        ManagerRegistry $doctrine, 
        User $user, 
        HubInterface $hub, 
        Request $request, 
        ChatRepository $chatRepository, 
        UserRepository $userRepository
    )
    {
        $data = json_decode($request->getContent());
        $author = $userRepository->find($data->author_id);

        $users_id = array($author->getId() , $user->getId());
        sort($users_id);
        $ids = $users_id[0] . $users_id[1];
        $chat = $chatRepository->findByUsersId($ids);

        if(!$chat) {
            $newChat = new Chat();
            $newChat->setUsersId($ids);

            $chat = $newChat;
        }

        $message = new Message;
        $message->setContent($data->message);
        $message->setAuthor($author);
        $message->setCreatedAt(new \DateTime());
        $message->setChat($chat);

        $entityManager = $doctrine->getManager();
        $entityManager->persist($message);
        $entityManager->persist($chat);
        $entityManager->flush();

        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'message' => $data->message
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'message' => $author 
        ]);
    }
}
