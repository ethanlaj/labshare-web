(function () {
	"use strict";

	window.addEventListener('load', init);
	let lastClickedComment;

	/**
	 * Initial function that is ran when the window loads
	 * Adds event listeners to:
	 * - Post buttons
	 * - Reply buttons
	 * - Comment buttons
	 */
	function init() {
		// Post buttons
		let savePostBtn = document.getElementById("savePostBtn");
		savePostBtn.addEventListener("click", savePost);

		let applyToPostBtn = document.getElementById("applyToPostBtn");
		applyToPostBtn.addEventListener("click", applyToPost);

		let reportPostBtn = document.getElementById("reportPostBtn");
		reportPostBtn.addEventListener("click", reportPost);

		let deletePostBtn = document.getElementById("deletePostBtn");
		deletePostBtn.addEventListener("click", deletePost);

		// Reply buttons
		let replyButtons = document.getElementsByClassName("replyButton");
		for (let replyButton of replyButtons)
			replyButton.addEventListener("click", startReply);

		let cancelReplyButtons = document.getElementsByClassName("cancelReply");
		for (let cancelReplyButton of cancelReplyButtons)
			cancelReplyButton.addEventListener("click", cancelReply);

		// Comment buttons
		let initEditCommentBtns = document.querySelectorAll(".dropdown-item.edit");
		for (let initEditCommentBtn of initEditCommentBtns)
			initEditCommentBtn.addEventListener("click", initEditComment);

		let initDeleteCommentBtns = document.querySelectorAll(".dropdown-item.delete");
		for (let initDeleteCommentBtn of initDeleteCommentBtns)
			initDeleteCommentBtn.addEventListener("click", lastClicked);

		let initReportCommentBtns = document.querySelectorAll(".dropdown-item.report");
		for (let initReportCommentBtn of initReportCommentBtns)
			initReportCommentBtn.addEventListener("click", lastClicked);

		let reportCommentBtn = document.getElementById("reportCommentBtn");
		reportCommentBtn.addEventListener("click", reportComment);

		let addCommentBtn = document.getElementById("addCommentBtn");
		addCommentBtn.addEventListener("click", addComment);

		let editCommentBtn = document.getElementById("editCommentBtn");
		editCommentBtn.addEventListener("click", editComment);

		let deleteCommentBtn = document.getElementById("deleteCommentBtn");
		deleteCommentBtn.addEventListener("click", deleteComment);
	}

	/**
	 * Allows the last clicked comment to be tracked for use the
	 * comment action button modals.
	 */
	function lastClicked() {
		let comment = $(this.closest('.comment'))[0];

		lastClickedComment = comment;
	}

	/**
	 * Checks to see whether a reply has been started or not.
	 * If it has been started, then add the reply
	 * If not, then setup the view to start the reply
	 */
	function startReply() {
		let comment = $(this.closest('.comment'))[0];

		let replyStatus = comment.getAttribute('replying');

		if (replyStatus == "false") {
			comment.setAttribute('replying', 'true');

			comment.querySelector(".replyButton").classList.replace("btn-secondary", "btn-primary")
			comment.querySelector(".cancelReply").hidden = false;
			comment.querySelector(".replyBox").hidden = false;
		} else {
			let reply = comment.querySelector('.replyBox');
			if (reply.value.trim() == "") {
				noReplyView(comment);
				return;
			}

			console.log(`Replied to ${comment.id} with "${reply.value}"`);
			reply.value = "";
			noReplyView(comment);
		}
	}

	/**
	 * Cancels a reply
	 */
	function cancelReply() {
		let comment = $(this.closest('.comment'))[0];

		noReplyView(comment);
	}

	/**
	 * Returns the comment to a non-reply view.
	 * @param {HTMLElement} comment - The comment that needs the view to be changed.
	 */
	function noReplyView(comment) {
		comment.setAttribute('replying', 'false');

		comment.querySelector(".replyButton").classList.replace("btn-primary", "btn-secondary")
		comment.querySelector(".cancelReply").hidden = true;
		comment.querySelector(".replyBox").hidden = true;
	}

	/**
	 * Saves the current post
	 */
	function savePost() {
		console.log("Saved post");
		$("#save").modal("show");
	}

	/**
	 * Applies to the current post
	 */
	function applyToPost() {
		console.log("Applied to post");
		$("#apply").modal("show");
	}

	/**
	 * Reports the current post
	 */
	function reportPost() {
		console.log("Reported post");
		$("#reportPost").modal("hide");
		$("#reportReceived").modal("show");
	}

	/**
	 * Deletes the current post
	 */
	function deletePost() {
		console.log("Deleted post");
		$("#deletePost").modal("hide");
		$("#postDeleted").modal("show");
	}

	/**
	 * Reports a comment
	 */
	function reportComment() {
		let comment = lastClickedComment;

		console.log(`Reported comment ${comment.id}`);
		$("#reportComment").modal("hide");
		$("#reportReceived").modal("show");
	}

	/**
	 * Adds a comment to the post
	 */
	function addComment() {
		let modalTextArea = document.getElementById("commentAddTextForm");
		console.log(`Added comment ${modalTextArea.value}`)
		modalTextArea.value = "";

		$("#addComment").modal("hide");
	}

	/**
	 * Initializes the comment edit modal, changing the form field
	 * to match the comment's content and length
	 */
	function initEditComment() {
		let comment = $(this.closest('.comment'))[0];

		lastClickedComment = comment;

		let modalTextArea = document.getElementById("commentEditTextForm");
		let innerText = comment.querySelector('.commentContent').innerText;
		modalTextArea.value = innerText
		modalTextArea.rows = innerText.length / 35;

		$("#editComment").modal("show");
	}

	/**
	 * Edits a comment
	 */
	function editComment() {
		let commentToEdit = lastClickedComment;
		let modalTextArea = document.getElementById("commentEditTextForm")

		commentToEdit.querySelector('.commentContent').innerText = modalTextArea.value;
		console.log(`Edited ${commentToEdit.id} to ${modalTextArea.value}`)
		$("#editComment").modal("hide");
	}

	/**
	 * Deletes a comment
	 */
	function deleteComment() {
		let comment = lastClickedComment;

		console.log(`Deleted comment ${comment.id}`);
		$("#deleteComment").modal("hide");
		$("#commentDeleted").modal("show");
	}
})();