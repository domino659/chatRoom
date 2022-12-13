<?php

namespace App\Controller;

use App\Repository\MessageRepository;
use App\Repository\ChatRepository;
use App\Entity\Chat;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ChatController extends AbstractController
{
    #[Route('/chat', name: 'chat')]
    public function getChats(ChatRepository $chatRepository): Response
    {
        $chats = $chatRepository->findAll();

        return $this->json([
            'chats' => $chats ?? []
        ]);
    }

    #[Route('/chatByUsersId/{user1}&{user2}', name: 'chat')]
    public function getChatByUsersId(ChatRepository $chatRepository, User $user1, User $user2, SerializerInterface $serializer)
    {
        $users_id = array($user1->getId() , $user2->getId());
        sort($users_id);
        $ids = $users_id[0] . $users_id[1];
        $chat = $chatRepository->findByUsersId($ids);

        return $this->json([
            'chat' => $serializer->normalize($chat, null, ['groups' => 'chatByUser'])
        ]);
    }
}
